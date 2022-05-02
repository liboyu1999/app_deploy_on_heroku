import React, {useState, useEffect} from 'react';
import { ImageBackground, FlatList, StyleSheet, TextInput, Text, bodyText,CameraRoll, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import { useSelector } from 'react-redux';
import {getUser} from '../redux/usersReducer';
import { Avatar } from 'react-native-elements';
import { Icon } from '@rneui/themed';
import { ref, uploadBytes, getStorage,getDownloadURL } from "firebase/storage";
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import {storage, db} from '../../firebase';
import { Constants,Permissions } from 'expo';

function ProfileScreen(props) {
    const [editable, setEditable] = useState(false);
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState();
    
    const [files, setFiles] = useState([]);
    const [avatarImage, setImage] = useState();
    const [uploading, setUploading] = useState(false);
    const [userId, setUserId] = useState();
    const metadata = {
        contentType: 'image/jpeg',
      };

      const emailUser = useSelector(getUser);
      const getProfileInfo = async() => {
  
    
        const q = query(collection(db, "users"), where("email", "==", emailUser ));
        let profileInfo;
        try{
        profileInfo = await getDocs(q);
        }catch(err){
          console.log('dsds',err);
        }
        
        profileInfo.forEach((doc) => {
          const username = doc.data().username;
          console.log("test", doc.data());
          setImage(doc.data().avatarUrl);
          console.log('avatar url', doc.data().avatarUrl)
          setPhone(doc.data().phoneNumber);
          setUserId(doc.id);
  
          setUserName(username);
        })
      }
  
     
    
        useEffect(async() =>{
          try{
          await getProfileInfo();
          }catch(err){
            console.log(err);
          }
        },[]);
  
        const editProfile = () => {
          console.log('text');
        }
  
      const onPress = async() => {
  
          // await Permissions.askAsync(Permissions.CAMERA_ROLL);
          // await Permissions.askAsync(Permissions.CAMERA);
  
  
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
        
            console.log(result);
      
  
          //   const imagesRef = ref(storage, 'images');
          //   try{
          //   uploadBytes(imagesRef , result).then((snapshot) => {
          //     console.log('Uploaded a blob or file!');
          //   });
          // }catch(err)
          // {
          //     console.log('upload error', err);
          // }
  
          //   if (!result.cancelled) {
          //     setImage(result.uri);
          //   }
  
            try {
              setUploading(true);
        
              if (!result.cancelled) {
                const uploadUrl = await uploadImageAsync(result.uri);
                console.log('upload url', uploadUrl);
                setImage(uploadUrl);
                   
                // const docRef = doc(db, "users", userId)
                // await updateDoc(docRef,{
                //   avatarUrl: uploadUrl,
                // })
              }
            } catch (e) {
              console.log(e);
              alert("Upload failed, sorry :(");
            } finally {
              setUploading(false);
            }
  
          //   const uploadTask = uploadBytes(storageRef, file, metadata); 
          };
      
      
  async function uploadImageAsync(uri) {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const imagesRef = ref(storage, 'images');
  
      try{
          uploadBytes(imagesRef , blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
        }catch(err)
        {
            console.log('upload error', err);
        }
  
  
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await getDownloadURL(imagesRef);
    }
    return (
      <ImageBackground 
                   
      source = {require("../assets/wiguna.jpg")}
      style = {styles.background}
>
  
<View style={{alignItems: 'center'}}>
        <Avatar
            rounded
            source={{uri:avatarImage,}}
            size="xlarge"
            >
                <Avatar.Accessory onPress={onPress}/>
            </Avatar>
            <Text>Change Profile Picture</Text>
            </View>

    <View style={styles.view}>
      <View >
      
      </View>
      <View style={styles.textBox}>  
      <Text style={{flexGrow: 1}}>User Name</Text>
      <Text style={{flexGrow: 1}}>{username} </Text>
           
        </View>
        <View style={styles.textBox}>  
      <Text style={{flexGrow: 1}}>Your Email</Text>
     <Text style={{flexGrow: 1}}>{emailUser} </Text>
           
        </View>
        <View style={styles.textBox}>  
      <Text style={{flexGrow: 1}}>Phone</Text>
      <Text style={{flexGrow: 1}}>{phone} </Text>
           
        </View>
        

    </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
    view: {
        height: 100,
        padding: 10,
      flex:7, 
      alignItems: "center"
    },
    textBox:{
      flexDirection:'row',backgroundColor:'white',opacity:0.5
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9e955',
        
    },
    input: {
      height: 15,
      margin: 40,
      // width: 200,
      // top:-500,
        borderColor: '#7a42f4',
        borderWidth: 1,
          // backgroundColor:"white",
          // opacity:0.75
      },
    head: {
        alignItems: "center",
        backgroundColor: "orange",
        height:30,
    },
    background:{
      flex:1,
     
      backgroundColor:"transparent",
      alignItems: "center"
     },
    //  TextInput:{
    //   height: 40,
    //   margin: 20,
    //   width: 200,
    //   top:-500,
    //     borderColor: '#7a42f4',
    //     borderWidth: 0,
    //       backgroundColor:"white",
    //       opacity:0.75
    //  },
    //  username: {
    //   height: 40,
    //   margin: 20,
    //   width: 200,
    //   top:-500,
    //     borderColor: '#7a42f4',
    //     borderWidth: 0,
    //       backgroundColor:"white",
    //       opacity:0.75  
    //  }
})


export default ProfileScreen;