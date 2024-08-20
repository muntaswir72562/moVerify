import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      primarySwatch: Colors.blue,
       scaffoldBackgroundColor: Colors.white,
      fontFamily: 'Poppins',
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: Color(0xFF2C3E50),
        ),
        displayMedium: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.w600,
          color: Color(0xFF2C3E50),
        ),
        displaySmall: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w500,
          color: Color(0xFF2C3E50),
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w500,
          color: Color(0xFF2C3E50),
        ),
        titleLarge: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: Color(0xFF2C3E50),
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: Color(0xFF2C3E50),
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: Color(0xFF2C3E50),
        ),
        labelLarge: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: Color(0xFF2C3E50),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.black,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 50),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.grey[200],
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        hintStyle: TextStyle(
          color: Colors.grey[500],
          fontSize: 14,
          fontWeight: FontWeight.normal,
        ),
      ),
    );
  }

  static const TextStyle thin = TextStyle(fontWeight: FontWeight.w100);
  static const TextStyle extraLight = TextStyle(fontWeight: FontWeight.w200);
  static const TextStyle light = TextStyle(fontWeight: FontWeight.w300);
  static const TextStyle regular = TextStyle(fontWeight: FontWeight.w400);
  static const TextStyle medium = TextStyle(fontWeight: FontWeight.w500);
  static const TextStyle semiBold = TextStyle(fontWeight: FontWeight.w600);
  static const TextStyle bold = TextStyle(fontWeight: FontWeight.w700);
  static const TextStyle extraBold = TextStyle(fontWeight: FontWeight.w800);
  static const TextStyle black = TextStyle(fontWeight: FontWeight.w900);

  static const TextStyle italic = TextStyle(fontStyle: FontStyle.italic);
}