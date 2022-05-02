import React, { useState, useEffect } from 'react';
import { View, Image,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import {db} from '../../firebase';
import {connect} from 'react-redux';
import { useSelector } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getUser} from '../redux/usersReducer';


const Map = () => {
  const locationSet = []
  const userRef = collection(db,'users');
  const [userId, setUserId] = useState();
  const [location, setLocation] = useState( {latitude: 30.616701789744717,
    longitude:  -96.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,});
  const [errorMsg, setErrorMsg] = useState(null);
  const[friendListLocation,setFriendListLocation] = useState([]);
  const profileUser = useSelector(getUser);   

  const q = query(collection(db, "users"), where("email", "==", profileUser));
  let friendLists = [];
  let userNameSet=[];

  const getLocation = async() => {
    
    console.log("efewe")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let newlocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
              enableHighAccuracy: true,
              timeInterval: 5
    });
    console.log('locationzz',newlocation);

    const latitude = newlocation.coords.latitude;
    const longitude = newlocation.coords.longitude;
    const latitudeDelta = 0;
    const longitudeDelta= 0;

    
    // get user's location and update firestore

    setLocation({latitude,
      longitude,latitudeDelta,longitudeDelta});

    locationSet.push(location);
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setUserId(doc.id);
      friendLists = doc.data().friendList

    })
    const docRef = doc(db, "users", userId)


    console.log('tnnd',friendLists)


    await updateDoc(docRef,{
    geoLocation: location
          })
    
    

    // get friendlist's location and store in data
    
    const locationQ = query(userRef, where("email","in",friendLists));

    let locationSnapShot;
  try{
    locationSnapShot  = await getDocs(locationQ);
  }catch(err)
  {
    console.log(err);
  }

  //console.log(pushTokenQ, "this is pushTokenQ")
  
  let geoLocation
  locationSnapShot.forEach((doc) => {

    geoLocation = doc.data().geoLocation;
    userNameSet.push(doc.data().username)

    console.log('wtm', doc.id)
    console.log('wtf',geoLocation)


    locationSet.push({
      geoLocation
    })
  })
  console.log('cnm',locationSet)

  setFriendListLocation(locationSet);
  
  console.log('leimu',friendListLocation)
  }

  useEffect(async() => {
   
    try{
      await getLocation()
    }catch(err)
    {
      console.log('rerw error',err);
    }

  }, []);
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 



  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        initialRegion={location}
      >

   
<Marker coordinate={location} title={'User Location'} >
          < Image

           source={{uri:"https://media-exp1.licdn.com/dms/image/D5603AQFg9fMbHOUsCg/profile-displayphoto-shrink_400_400/0/1649276902768?e=1657152000&v=beta&t=cmeoPkbcdB7lLrvyMNgaEyGLXJzq4kx_xcW5jEEBg2I"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

          />
        </Marker>

        <Marker coordinate={{latitude: 47.641496889715135,
    longitude: -122.35786350809813,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'Logan Location'} >
          < Image

           source={{uri:"https://media-exp1.licdn.com/dms/image/C4E03AQGFZYhnB0UN4w/profile-displayphoto-shrink_800_800/0/1545284748017?e=1657152000&v=beta&t=scZ2TotI_Dw-L2lxeaoqUFo_7-hc8egRyyOF4JzyBgQ"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

          />
        </Marker>

        <Marker coordinate={{latitude: 30.616098997756332,
    longitude:  -96.33850557621055,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'Yukon Location'} >
          < Image

           source={{uri:"https://media-exp1.licdn.com/dms/image/C4E03AQFb5w2Z1Fi0Ew/profile-displayphoto-shrink_100_100/0/1642570931168?e=1657152000&v=beta&t=OgYYdDBVe3cFB62znzBXXJxgYXJzPlwng75Dn8bPvNk"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

          />
        </Marker>

        <Marker coordinate={{latitude: 30.610815227701885,
    longitude:  -96.31721681578658,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'User Location'} >
          < Image

           source={{uri:"https://media-exp1.licdn.com/dms/image/C4E03AQFb9uIYA7ciQQ/profile-displayphoto-shrink_800_800/0/1648592004388?e=1657152000&v=beta&t=W6AwCbrEvBaF1l7GUn0zrJ404NOcjFl1oLvoAckqtwQ"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

          />
        </Marker>
        <Marker coordinate={{latitude: 30.621298734682835,
    longitude:  -96.34037747345774,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'User Location'} >
          < Image

           source={{uri:"https://media-exp1.licdn.com/dms/image/D4E35AQEjg2jD4LPpTw/profile-framedphoto-shrink_100_100/0/1644011860224?e=2147483647&v=beta&t=ewqL1cMxa-qv-YwX0hiDq4U6QiBUieBu16qt1y7retE"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

          />
        </Marker>
{/* <Marker coordinates={{latitude: 15.716701789744717,
    longitude:  -100.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'new User'}>      < Image

    source={{uri:"https://firebasestorage.googleapis.com/v0/b/curastone-74faf.appspot.com/o/cd654793-481e-48cb-b176-9f78baae7e75.jpg?alt=media&token=91a9ced6-594a-4193-9582-59b32c0ac8f7"}}
    style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

   /></Marker>
<Marker coordinates={{latitude: 15.516701789744717,
    longitude:  -100.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'new User2'}>      < Image

    source={{uri:"https://firebasestorage.googleapis.com/v0/b/curastone-74faf.appspot.com/o/cd654793-481e-48cb-b176-9f78baae7e75.jpg?alt=media&token=91a9ced6-594a-4193-9582-59b32c0ac8f7"}}
    style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

   /></Marker>

<Marker coordinates={{latitude: 15.416701789744717,
    longitude:  -100.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}} title={'new User3'}>      < Image

    source={{uri:"https://firebasestorage.googleapis.com/v0/b/curastone-74faf.appspot.com/o/cd654793-481e-48cb-b176-9f78baae7e75.jpg?alt=media&token=91a9ced6-594a-4193-9582-59b32c0ac8f7"}}
    style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}

   /></Marker> */}
        {/* {friendListLocation.map((val, i) => {
                    
                      
                        <Marker
                        key={i}
                        coordinate={val.geoLocation}
                        />
                    
                })} */}
        

      </MapView>
    </View>
  );
};



export default Map;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});