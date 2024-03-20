import { View, Text, TextInput, TouchableOpacity } from "react-native"
import * as SQLite from "expo-sqlite"
import { useEffect, useState } from "react";
import { dbExport as db } from "../utils/db"
import { UserDTO } from "../types/User";
import { SafeAreaView } from "react-native-safe-area-context";



const SignUp = () => {

    const [user, setUser] = useState<UserDTO | null>(null)
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");

    const handleAddUser = async () => {

        
        if (user != null) {

            const token = "1a2b3c4d"
            setUser(
                {
                    id: undefined,
                    name,
                    username,
                    password,
                    image,
                    token
                }
            )
        }
        setUser(null)
    };



    return (
        <SafeAreaView>
                    <TextInput 
                        onChangeText={setName}
                        value={name}
                        placeholder="Nome"
                    />
                     <TextInput 
                        onChangeText={setUsername}
                        value={username}
                        placeholder="UserName"
                    /> 
                    <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Senha"
                /> 
                <TextInput 
                onChangeText={setImage}
                value={image}
                placeholder="Imagem"
            />

            <TouchableOpacity onPress={handleAddUser}>
            <Text>Criar</Text>
            </TouchableOpacity>
                
            
        </SafeAreaView>
    )
}

export default SignUp