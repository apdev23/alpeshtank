import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Fonts } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchLogin } from "../../redux/slice/Auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const [secureText, setSecureText] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "testpracticaluser001@mailinator.com",
      password: "Test@123",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    dispatch(fetchLogin(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Logo / Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Pliē</Text>
        <View style={styles.logoPlaceholder}>
          <Icon name="image-outline" size={40} color="#555" />
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.email ? { borderColor: "red" } : null,
              ]}
              placeholder="email@email.com"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View
          style={[
            styles.passwordContainer,
            errors.password ? { borderColor: "red" } : null,
          ]}
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={secureText}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeButton}
          >
            <Icon
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.signInText}>Sign In</Text>
          {loading && <ActivityIndicator />}
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Not a member? <Text style={styles.signupLink}>Sign Up Here</Text>
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or Sign In with:</Text>
        <View style={styles.divider} />
      </View>

      {/* Social login buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../../assets/images/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../../assets/images/apple.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { height: 40, paddingTop: 3 }]}
        >
          <Image
            source={require("../../../assets/images/facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Guest */}
      <TouchableOpacity>
        <Text style={styles.guestText}>Enter as Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: Fonts.Roboto_Regular,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: "#000",
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    fontFamily: Fonts.Roboto_Regular,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#888",
    fontSize: 12,
    marginBottom: 20,
    fontFamily: Fonts.Roboto_Regular,
  },
  signInButton: {
    backgroundColor: "#0fce8a",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 15,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  signupText: {
    fontSize: 12,
    textAlign: "right",
    color: "#333",
    fontFamily: Fonts.Roboto_Regular,
  },
  signupLink: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
    fontFamily: Fonts.Roboto_Regular,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#666",
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
  guestText: {
    textAlign: "right",
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
    fontFamily: Fonts.Roboto_Regular,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.Roboto_Regular,
    marginBottom: 4,
  },
});
