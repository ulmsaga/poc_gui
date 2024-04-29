package com.mobigen.cdev.poc.core.security.util.rsa;

import java.security.PrivateKey;

public class RSAKeySet {
    private final PrivateKey privateKey;
    private final String publicKeyExponent;
    private final String publicKeyModulus;

    public RSAKeySet(PrivateKey privateKey, String publicKeyModulus, String publicKeyExponent) {
        this.privateKey = privateKey;
        this.publicKeyModulus = publicKeyModulus;
        this.publicKeyExponent = publicKeyExponent;
    }

    public PrivateKey getPrivateKey() {
        return privateKey;
    }

    public String getPublicKeyModules() {
        return publicKeyModulus;
    }

    public String getPublicKeyExponent() {
        return publicKeyExponent;
    }
}
