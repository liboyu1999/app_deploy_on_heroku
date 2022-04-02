import React, {useState}from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import AppText from './AppText';
import AwesomeAlert from 'react-native-awesome-alerts';
function AddFriendItem({ title, image }) {
    // const [popup,Setpopup]=useState(false)
    const [displayAlert, showAlert] = useState(false);



    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <AppText style={styles.title}>{title}</AppText>
            <Button  title ="Add Friend"
                     onPress={() => showAlert(true)}
            />

            <View>

            

          <AwesomeAlert
          show={displayAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="Do you really want to add ?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {showAlert(false)
          }}
          onConfirmPressed={() => {showAlert(false)
          }}
        />





            
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
     
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    title: {
        fontWeight: "500",
    },

})


export default AddFriendItem;