package com.mobigen.cdev.poc.core.security.util.sha;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHAUtil {

    public static final String SHA512_ALGORITHM = "SHA-512";
    public static String sha512(String decValue) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(SHA512_ALGORITHM);
            byte[] bytes = messageDigest.digest(decValue.getBytes());
            BigInteger segnum = new BigInteger(1, bytes);
            StringBuilder hashtext = new StringBuilder(segnum.toString(16));
            while (hashtext.length() < 32) {
                hashtext.insert(0, "0");
            }
            return hashtext.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
