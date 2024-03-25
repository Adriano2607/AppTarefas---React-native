import { TextInput, TouchableOpacity,Text, Alert } from "react-native"
import { useState } from "react";
import { UserDTO } from "../types/User";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Colors/colors";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import { FontAwesome } from '@expo/vector-icons';
import { openDatabase } from "../utils/db";


const SignUp = () => {
  const db = openDatabase()
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

const valida = () => {
    if(!name || !username || !password)  {
        Alert.alert("Presta Atencao !!!")
         return
    }    
    handleAddUser()
}



    const handleAddUser = async () => {
            const token = uuid();

            try {
                db.transaction((tx) => {
                    tx.executeSql(
                        "INSERT INTO users (name, username, password, image, token) VALUES (?, ?, ?, ?, ?)",
                        [name, username, password, imageUrl ? imageUrl : 'https://media.contentapi.ea.com/content/dam/eacom/common/medallion-violet.png', token]
                    );
                  });
            } catch (e) {
                console.log("Error:", e)
            }

            Alert.alert("Sucesso")

            console.log("conta criado: ", name)
        
    };

    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.cor2}}>
            <TextInput  
                style={{borderBottomWidth:1,borderLeftWidth:4 ,width:'90%',paddingLeft:15,color:colors.cor6,borderColor:colors.cor6,marginBottom:15,borderRadius:5}}
                placeholderTextColor='white'
                onChangeText={setName}
                value={name}
                placeholder="Nome"
            />
            <TextInput 
                style={{borderBottomWidth:1,borderLeftWidth:4 ,width:'90%',paddingLeft:15,color:colors.cor6,borderColor:colors.cor6,marginBottom:15,borderRadius:5}}
                placeholderTextColor='white'
                onChangeText={setUsername}
                value={username}
                placeholder="UserName"
            /> 
            <TextInput
                style={{borderBottomWidth:1,borderLeftWidth:4 ,width:'90%',paddingLeft:15,color:colors.cor6,borderColor:colors.cor6,marginBottom:15,borderRadius:5}}
                placeholderTextColor='white'
                onChangeText={setPassword}
                value={password}
                placeholder="Senha"
            /> 
            <TextInput 
                style={{borderBottomWidth:1,borderLeftWidth:4 ,width:'90%',paddingLeft:15,color:colors.cor6,borderColor:colors.cor6,marginBottom:15 ,borderRadius:5}}
                placeholderTextColor='white'
                onChangeText={setImageUrl} 
                value={imageUrl} 
                placeholder="Imagem"
            />

            <TouchableOpacity onPress={ () => valida()} style={{borderRadius:10,borderColor:colors.cor6,padding:10}}>
               <Text style={{color:'white'}}>Criar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SignUp;
