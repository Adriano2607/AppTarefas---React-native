import { View, Text } from "react-native"
import * as SQLite from "expo-sqlite"
import { useEffect, useState } from "react";
import { dbExport as db } from "../utils/db"
import { UserDTO } from "../types/User";


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
        <View>

        </View>
    )
}

export default SignUp