package com.mobigen.cdev.poc.core.exception;

public class RsResultException extends Exception {
    private static final long serialVersionUID = -6176373904149984763L;
    private String messageKey;
    private Object[] args;

    public RsResultException(String message) {
        this.messageKey = message;
    }

    public RsResultException(String message, Object[] args) {
        this.messageKey = message;
        this.args = args;
    }

    public RsResultException(String message, Object[] args, Throwable cause) {
        this.messageKey = message;
        this.args = args;
        this.initCause(cause);
    }

    public RsResultException(Throwable cause) {
        this.initCause(cause);
        if (((RsResultException) cause).getMessageKey() != null) {
            this.messageKey = ((RsResultException) cause).getMessageKey();
        }
    }

    public String getMessageKey() {
        return messageKey;
    }

    public Object[] getArgs() {
        return args;
    }
}
