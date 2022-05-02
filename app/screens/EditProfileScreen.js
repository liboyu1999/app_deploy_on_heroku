import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, TextInput, Text, bodyText,CameraRoll, Button, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import { useSelector } from 'react-redux';
import {getUser} from '../redux/usersReducer';
import { Avatar } from 'react-native-elements';
import { Icon } from '@rneui/themed';
import { ref, uploadBytes, getStorage } from "firebase/storage";
import {storage, db} from '../../firebase';
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Constants,Permissions } from 'expo';

function ProfileScreen(props) {
  // const emailUser = useSelector(getUser);  
    const [editable, setEditable] = useState(false);
    const [username, setUserName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState();
    
    const [files, setFiles] = useState([]);
    const [avatarImage, setImage] = useState();
    const [uploading, setUploading] = useState(false);
    const metadata = {
        contentType: 'image/jpeg',
      };
    
    const emailUser = "testnihao@gmail.com";
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
    <SafeAreaView>
        <View style={{alignItems: 'center'}}>
        <Avatar
            rounded
            source={{uri:avatarImage,}}
            size="xlarge"
            >
                <Avatar.Accessory onPress={onPress}/>
            </Avatar>
            </View>
    <View style={styles.view}>
      <View style={{alignItems:'flex-end'}}>
      <Text onPress={editProfile} style={{alignItems:'flex-end'}}>Edit Profile</Text>
      </View>
      <View style={{flexDirection:'row'}}>  
      <Text style={{flexGrow: 1}}>User Name</Text>
      <TextInput
          style={styles.input}
          onChangeText = {setUserName}
        />
           
        </View>
        <View style={{flexDirection:'row'}}>
      <Text style={{flexGrow: 1}}>Your Email</Text>
      <TextInput
          style={styles.input}
          onChangeText = {setUserName}
        />
           
        </View>
        <View style={{flexDirection:'row'}}>
      <Text style={{flexGrow: 1}}>Phone</Text>
      <TextInput
          style={styles.input}
          onChangeText = {setPhone}
        />
           
        </View>
        
        <Button
                  title={'submit'}
                        />
    </View>
    {/* <View style={styles.view}>
      <Text>email</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View> */}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        height: 100,
        padding: 10,
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
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        flexGrow: 4,
      },
    head: {
        alignItems: "center",
        backgroundColor: "orange",
        height:30,
    }

})


export default ProfileScreen;