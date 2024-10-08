package com.mobigen.cdev.poc.core.exception;

import java.sql.SQLException;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ControllerThrowsAdvice implements ThrowsAdvice {

    @AfterThrowing(value = "execution(public org.springframework.http.ResponseEntity *(..))", throwing = "e")
    public void ControllerAfterThrowing(JoinPoint joinPoint, Exception e) throws RsResultException {
        String messageKey = "";
        Object[] args = null;

        if (e instanceof RsResultException) {
            messageKey = ((RsResultException) e).getMessageKey();
            args = ((RsResultException) e).getArgs();
        } else if (e instanceof RsRuntimeException) {
            messageKey = ((RsRuntimeException) e).getMessageKey();
            args = ((RsRuntimeException) e).getArgs();
        } else if (e instanceof DataAccessException && e.getCause() instanceof SQLException) {
            // Mybatis JDBC Exception 중에서 SQLException
            SQLException sqlException = (SQLException) e.getCause();
            int errorCode = sqlException.getErrorCode();
            String strErrorCode = Integer.toString(sqlException.getErrorCode());
            String sqlState = sqlException.getSQLState();
            String cause = sqlException.toString().trim().split(":")[0];
            args = new Object[] {cause, sqlState, strErrorCode};

            // QueryTimeoutException 일 경우는 MessageSource 처리를 별도로 한다. (i18n/messages/erro/error*.properties)
            if (errorCode == 1013) {
                // ExceptionClass : QueryTimeoutException.class
                // ORACLE : java.sql.SQLTimeoutException
                // error code : 1013
                messageKey = cause;
            } else if ((cause.indexOf("SQLTimeoutException") > -1)) {
                // ExceptionClass : QueryTimeoutException.class
                // MYSQL : com.mysql.jdbc.exceptions.MySQLTimeoutException
                // error code : 0 (안잡힘)
                messageKey = "java.sql.SQLTimeoutException";
            } else {
                // 그 외 SQLException
                messageKey = "java.sql.SQLException";
            }

        } else if (e instanceof Exception) {
            messageKey = e.getMessage();
        } else {
            messageKey = e.getMessage();
        }

        if ("".equals(messageKey)) {
            messageKey = joinPoint.toString();
        }

        throw new RsResultException(messageKey, args, e);
    }
}
