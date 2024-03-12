import { StyleSheet, TextInput, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";
import { Input, Block } from "galio-framework";
import { Button } from "galio-framework";
import { colors } from "../Colors/colors";
import { Container } from "../styledComponents/styled";


const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
   <Container style={{backgroundColor:'black'}}>
   
      <Input
        style={styles.inputContainer}
        placeholder="Username"
        right
        icon="user"
        family="Feather"
        iconSize={15}
        iconColor={colors.corPreto}
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
        iconColor={colors.corPreto}
      />

      {/* mudar aqui */}
      <Button
      textStyle={{color:'black'}}
        color={colors.corBtn}
        onPress={() => login("yraigatt3", "sRQxjPfdS")}
        style={styles.btn}
      > LOGIN </Button>
    </Container>
  );
};

const styles = StyleSheet.create({

  btn: {
    width: "80%",
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  }, inputContainer: {
    width: '80%', 
  },
});

export default Login;