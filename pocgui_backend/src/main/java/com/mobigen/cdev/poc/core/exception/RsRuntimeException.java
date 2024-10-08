package com.mobigen.cdev.poc.core.exception;


public class RsRuntimeException extends RuntimeException {
    private static final long serialVersionUID = -4011691028163787749L;
    private String messageKey;
    private Object[] args;

    public RsRuntimeException(String message) {
        this.messageKey = message;
    }

    public RsRuntimeException(String message, Object[] args) {
        this.messageKey = message;
        this.args = args;
    }

    public RsRuntimeException(String message, Object[] args, Throwable cause) {
        this.messageKey = message;
        this.args = args;
        this.initCause(cause);
    }

    public RsRuntimeException(String message, Throwable cause) {
        this.messageKey = message;
        this.initCause(cause);
    }

    public RsRuntimeException(Throwable cause) {
        this.initCause(cause);
        if (((RsRuntimeException) cause).getMessageKey() != null) {
            this.messageKey = ((RsRuntimeException) cause).getMessageKey();
        } else {
            if (((RsRuntimeException) cause).getCause() != null) {
                this.messageKey = ((RsRuntimeException) cause).getCause().getMessage();
            }
        }
    }

    public String getMessageKey() {
        return messageKey;
    }

    public Object[] getArgs() {
        return args;
    }
}
