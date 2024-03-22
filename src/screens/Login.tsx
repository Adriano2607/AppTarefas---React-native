import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { colors } from "../Colors/colors";
import { Container } from "../styledComponents/styled";
import { dbExport as db } from "../utils/db";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM users;`, [], (_, { rows: { _array } }) => {
      console.log("array users setados: ", _array[0]);
    });
  });

  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const navigation = useNavigation<any>();



  const navigate = () => {
    navigation.navigate("SignUp")
  }

  return (
    <Container style={{ backgroundColor: "black" }}>
      <Image
        style={{ height: 150, width: 150,marginBottom:15 }}
        source={require("../../assets/ok.png")}
      />

      <Input
        style={styles.inputContainer}
        placeholder="Username"
        right
        icon="user"
        family="Feather"
        iconSize={15}
        iconColor={colors.cor4}
        onChangeText={setUsername}
        value={username}
      />

      <Input
        style={styles.inputContainer}
        placeholder="Password"
        password
        viewPass
        value={password}
        onChangeText={setPassword}
        iconColor={colors.cor4}
      />

      <Button
        textStyle={{ color: "black" }}
        color={colors.cor5}
        onPress={() => login(username, password)}
        style={styles.btn}
      >
        LOGIN
      </Button>
      <TouchableOpacity onPress={navigate}>
        <Text style={{ color: "white" }}>Ainda não tem uma conta?</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
});

export default Login;
