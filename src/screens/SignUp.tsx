import { TextInput, TouchableOpacity } from "react-native"
import { useState } from "react";
import { UserDTO } from "../types/User";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Colors/colors";

import { FontAwesome } from '@expo/vector-icons';



const SignUp = () => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [name, setName] = useState("Electronics Arts");
    const [username, setUsername] = useState("EA");
    const [password, setPassword] = useState("fifa");
    const [imageUrl, setImageUrl] = useState("../../assets/ea.png"); 

    const handleAddUser = async () => {
        if (user != null) {
            const token = "1a2b3c4d";
            setUser({
                id: undefined,
                name,
                username,
                password,
                image: imageUrl, 
                token
            });
        }
        setUser(null);
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

            <TouchableOpacity onPress={handleAddUser} style={{borderRadius:10,borderColor:colors.cor6,padding:10}}>
                <FontAwesome name="check-circle" size={60} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SignUp;
