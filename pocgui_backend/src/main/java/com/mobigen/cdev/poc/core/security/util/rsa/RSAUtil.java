package com.mobigen.cdev.poc.core.security.util.rsa;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;

public class RSAUtil {

    public static final String RSA_ALGORITHM = "RSA";
    public static final String RSA_KEY = "_RSA_KEY_";
    public static final String RSA_MODULUS = "RSAModulus";
    public static final String RSA_EXPONENT = "RSAExponent";

    public static RSAKeySet generatePrivateKey() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
            keyPairGenerator.initialize(1024);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
            PublicKey publicKey = keyPair.getPublic();
            PrivateKey privateKey = keyPair.getPrivate();

            RSAPublicKeySpec publicKeySpec = keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
            String publicKeyModules = publicKeySpec.getModulus().toString(16);
            String publicKeyExponent = publicKeySpec.getPublicExponent().toString(16);

            return new RSAKeySet(privateKey, publicKeyModules, publicKeyExponent);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            if (e.getCause() != null) {
               throw  new RsRuntimeException(e.getCause());
            }
            throw new RsRuntimeException(e);
        }
    }

    public static PrivateKey getPrivateKeyAtSession(HttpSession httpSession) {
        if (httpSession == null) return null;
        return (PrivateKey) httpSession.getAttribute(RSA_KEY);
    }

    public static void removePrivateKeyAsSession(HttpSession httpSession) {
        if (httpSession != null) {
            httpSession.removeAttribute(RSA_KEY);
        }
    }

    public static String descryptRSA(PrivateKey privateKey, String encryptValue) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            byte[] encryptBytes = hexToByteArray(encryptValue);
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] decryptBytes = cipher.doFinal(encryptBytes);
            return new String(decryptBytes, StandardCharsets.UTF_8);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | BadPaddingException e) {
            if (e.getCause() != null) {
                throw  new RsRuntimeException(e.getCause());
            }
            throw new RsRuntimeException(e);
        } catch (IllegalBlockSizeException e) {
            throw new RuntimeException(e);
        }
    }

    public static byte[] hexToByteArray(String hex) {
        if (hex == null || hex.length() % 2 != 0) return null;

        byte[] bytes = new byte[hex.length() / 2];
        for (int i = 0; i < hex.length(); i += 2) {
            byte anInt = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
            bytes[(int) Math.floor(i / 2)] = anInt;
        }
        return bytes;
    }
}
