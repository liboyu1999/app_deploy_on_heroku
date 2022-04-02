import React, { useEffect , useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert, ScrollView } from 'react-native';
// import {ListItem} from 'react-native-elements'
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';




function FriendList ({navigation}) {
    const [Listing,setListing] = useState([])
    useEffect(() => { 
        const query = async() =>{
        const querySnapshot =  await  getDocs(collection(db, "users"));
        let Listing = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log("0", doc.data());
            Listing.push(doc.data());
          });
          // console.log("1", Listing);
          setListing(Listing);
       }
       query()

    },[])
    // console.log("2", Listing);


    return(

<SafeAreaView style={styles.container}>
                <View styles={styles.listContainer}>
    

     
<ScrollView>
  
{
   Listing.map((l, i) => 
    
        
   (<ListItem
        key={i}
    
        title={l.Name}
        image = {require("../assets/fox.png")}
      />
    )
)
   } 

  
</ScrollView>




                    {/* <View style={styles.buttonContainer}>
                        <Button title="Button1" onPress={() => {createThreeButtonAlert}}/>
                    </View> */}
            
         




      { <Button
        title="Add Friend"
        onPress={() => 
        navigation.navigate("AddFriend")
        } />  

      }
        </View>
       
        </SafeAreaView>

    )

}





const styles = StyleSheet.create({
    buttonContainer: { 
        borderRadius: 10, 
  shadowColor: "grey", 
  shadowOffset: {width: 10, height: 10}, 
  shadowOpacity: 1, 
    }, 
    container: { 
  flex: 1, 
  backgroundColor: "#f9e955", 
  alignItems: "center", 
  justifyContent: "center", 
  }, 
    listElement: { 
  flexDirection: "row", 
  padding:90, 
  }, 
    listContainer: { 
  flex: 0.5, 
  backgroundColor: "#f9e955", 
  right: 100, 
  justifyContent: "space-evenly", 
  padding : 10, 
  }, 
    image: { 
  width: 70, 
  height: 70, 
  borderRadius: 35, 
    }, 
    textElement: { 
    }, 
    userContainer: { 
  marginVertical: 40, 
    } 

    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   marginHorizontal: 16,
    // },
    // title: {
    //   textAlign: 'center',
    //   marginVertical: 8,
    // },
    // fixToText: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    // },
    // separator: {
    //   marginVertical: 8,
    //   borderBottomColor: '#737373',
    //   borderBottomWidth: StyleSheet.hairlineWidth,
    // },
  });


// const Listing = [
//   {
//     id: "Amy",
//     Email: "aaa111@gmail.com",
//     PhoneNumber: 8888888888,
//   },
//   {
//     id: "Allen",
//     Email: "ccc333@gmail.com",
//     PhoneNumber: 6666666666,
//   },
//   {
//     id: "Alex",
//     Email: "bbb222@gmail.com",
//     PhoneNumbe: 7777777777,
//   },
//   {
//     id: "Andy",
//     Email: "ddd444@gmail.com",
//     PhoneNumbe: 5555555555,
//   }
// ]



export default FriendList;