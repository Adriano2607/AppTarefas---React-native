// import { View, Text } from "react-native"
// import * as SQLite from "expo-sqlite"
// import { useEffect } from "react";
// import { db } from "../utils/db"


// const SignUp = () => {
    
//       const getTasks = async () => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             `select * from tasks where completed = 0;`,
//             [],
//             (_, { rows: { _array } }) => {
//               setTaskList(_array);
//             }
//           );
//         });
//       };
    
//       const getTasksByCategory = (category: string) => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             `select * from tasks where completed = 0 and category = ?;`,
//             [category],
//             (_, { rows: { _array } }) => {
//               setTaskList(_array);
//             }
//           );
//         });
//       };
    
//       const getCompletedTasks = () => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             `select * from tasks where completed = 1;`,
//             [],
//             (_, { rows: { _array } }) => {
//               setTaskList(_array);
//             }
//           );
//         });
//       };
    
//       const handleAddTask = async () => {
//         if (taskInput !== "" && categoryValue) {
//           db.transaction((tx) => {
//             tx.executeSql(
//               "insert into tasks (completed, title, category) values (0, ?, ?)",
//               [taskInput, categoryValue]
//             );
//             tx.executeSql(
//               `select * from tasks where completed = 0;`,
//               [],
//               (_, { rows: { _array } }) => {
//                 setTaskList(_array);
//               }
//             );
//           });
//         }
    
//         setTaskInput("");
//         setCategoryValue(null);
//       };
    
//       const handleRemoveTask = (id: number) => {
//         db.transaction((tx) => {
//           tx.executeSql("delete from tasks where id = ?", [id]);
//           tx.executeSql(
//             `select * from tasks where completed = 0;`,
//             [],
//             (_, { rows: { _array } }) => {
//               setTaskList(_array);
//             }
//           );
//         });
//       };
    
//       const handleDoneTask = (id: number) => {
//         db.transaction((tx) => {
//           tx.executeSql("update tasks set completed = ? where id = ? ", [1, id]);
//           tx.executeSql(
//             `select * from tasks where completed = 0;`,
//             [],
//             (_, { rows: { _array } }) => {
//               setTaskList(_array);
//             }
//           );
//         });
//       };
    
//       const handleSelectCategory = (type: string) => {
//         setSelectedCategory(type);
//         switch (type) {
//           case "all":
//             getTasks();
//             break;
//           case "done":
//             getCompletedTasks();
//             break;
//           default:
//             getTasksByCategory(type);
//         }
//       };

//     return(
//         <View>
            
//         </View>
//     )
// }

// export default SignUp