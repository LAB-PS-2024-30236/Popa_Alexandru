package com.app.project.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validators {
    public static boolean passwordSpecialCharacterValidator(String password) {
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");

        Matcher hasLetter = letter.matcher(password);
        Matcher hasSpecial = special.matcher(password);

        return hasLetter.find() && hasSpecial.find();
    }

    public static boolean passwordNumberValidator(String password) {
        Pattern digit = Pattern.compile("[0-9]");
        Matcher hasDigit = digit.matcher(password);

        return hasDigit.find();
    }
}
