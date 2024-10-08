package com.mobigen.cdev.poc.core.exception;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler {
    private final MessageSourceAccessor messageSourceAccessor;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public GlobalExceptionHandler(MessageSourceAccessor messageSourceAccessor) {
        this.messageSourceAccessor = messageSourceAccessor;
    }

    @ExceptionHandler(RsResultException.class)
    @ResponseBody
    public ResponseEntity<RsResultDto> rsResultExceptionHandler(RsResultException e) {
        logger.error("rsResultExcption : {}", e);
        return ResponseEntity.ok(rsResultException(e));
    }

    @ExceptionHandler(RsRuntimeException.class)
    @ResponseBody
    public ResponseEntity<RsResultDto> rsRuntimeExceptionHandler(RsRuntimeException e) {
        logger.error("rsRuntimeException : {}", e);
        return ResponseEntity.ok(rsRuntimeException(e));
    }

    private RsResultDto rsResultException(RsResultException e) {
        RsResultDto resultDto = new RsResultDto();
        String msg = "";
        String messageKey = "error.common.globalException";

        if (e.getMessageKey() != null) messageKey = e.getMessageKey();

        if ("".equals(e.getMessageKey()) || e.getMessageKey() == null) {
            // messageKey 없을 경우 기본 Msg
            msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
        } else {
            try {
                if (e.getArgs() == null) {
                    // messageKey는 있으나 arg[]가 경우
                    messageKey = e.getMessageKey();
                    msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
                } else {
                    messageKey = e.getMessageKey();
                    // messageKey는 있고 arg[] 있는 경우
                    msg = messageSourceAccessor.getMessage(messageKey, e.getArgs(), Locale.getDefault());
                }
            } catch (NoSuchMessageException noSuchMessageException) {
                // i18n.messages에서 못찾을 경우 그냥 기본 Msg
                messageKey = "error.common.globalException";
                msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
            }
        }

        String errCause = "";
        if (e.getMessageKey().contains("SQL")) {
            errCause = e.getArgs()[0].toString();
        } else {
            errCause = e.getCause().toString();
        }
        resultDto.setMessageKey(messageKey);
        resultDto.setErrorCause(errCause);
        resultDto.setErrorMessage(msg);
        return resultDto;
    }

    private RsResultDto rsRuntimeException(RsRuntimeException e) {
        RsResultDto resultDto = new RsResultDto();
        String msg = "";
        String messageKey = "error.common.globalException";
        String errCause = "";

        if (e.getMessageKey() != null) messageKey = e.getMessageKey();

        if (e.getCause() != null) errCause = e.getCause().toString();

        if ("".equals(e.getMessageKey()) || e.getMessageKey() == null) {
            // messageKey 없을 경우 기본 Msg
            msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
        } else {
            try {
                if (e.getArgs() == null) {
                    // messageKey는 있으나 arg[]가 경우
                    messageKey = e.getMessageKey();
                    msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
                } else {
                    // messageKey는 있고 arg[] 있는 경우
                    messageKey = e.getMessageKey();
                    msg = messageSourceAccessor.getMessage(messageKey, e.getArgs(), Locale.getDefault());
                }
            } catch (NoSuchMessageException noSuchMessageException) {
                // i18n.messages에서 못찾을 경우 그냥 기본 Msg
                messageKey = "error.common.globalException";
                msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
            }
        }

        resultDto.setMessageKey(messageKey);
        resultDto.setErrorCause(errCause);
        resultDto.setErrorMessage(msg);
        return resultDto;
    }

    /*
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<RsResultDto> defaultExceptionHanlder(Exception e) {
    	logger.error("Exception : {}", e);
        String messageKey = "";
        if (e.getCause() instanceof RsResultException) {
            messageKey = ((RsResultException) e.getCause()).getMessageKey();
        } else if (e.getCause()  instanceof RsRuntimeException) {
            messageKey = ((RsRuntimeException) e.getCause()).getMessageKey();
        }

        if (messageKey != "" && messageKey != null) {
            return ResponseEntity.ok(defaultException(e, messageKey));
        } else {
            return ResponseEntity.ok(defaultException(e));
        }
    }

    private RsResultDto defaultException(Exception e) {
        RsResultDto resultDto = new RsResultDto();
        String messageKey = "error.common.globalException";
        String msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
        resultDto.setMessageKey(messageKey);
        resultDto.setErrorCause(e.getCause().toString());
        resultDto.setErrorMessage(msg);
        return resultDto;
    }

    private RsResultDto defaultException(Exception e, String messageKey) {
        RsResultDto resultDto = new RsResultDto();
        // String messageKey = "error.common.globalException";
        String msg = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
        resultDto.setMessageKey(messageKey);
        resultDto.setErrorCause(e.getCause().toString());
        resultDto.setErrorMessage(msg);
        return resultDto;
    }
    */
}
