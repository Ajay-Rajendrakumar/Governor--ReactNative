import React, { Component } from 'react';
import { BackHandler, Linking, Share,FlatList, View,Text,TouchableOpacity,TouchableWithoutFeedback, StyleSheet, TextInput, Button } from 'react-native';
import call from 'react-native-phone-call';
import RNExitApp from 'react-native-exit-app';
global.phonenumber="";

export default class App extends Component {

constructor(){
      super();
    
  }
  call = (no) => {
    
    const args = {
      number: no,
      prompt: false,
    };
    call(args).catch(console.error);
  };

 share = (msg) => {
  const shareOptions = {
  title: 'Share',
  message: msg,
  };
  Share.share(shareOptions)
};

 sendOnWhatsApp=(message,number) => {
    let msg = message;
    let mobile = phonenumber;
    if(mobile){
      if(msg){
        let url = 'whatsapp://send?text=' + msg + '&phone= 91' + phonenumber;
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please insert mobile no');
    }
  }

exit(opt) {
      if(opt=="yes")  
        BackHandler.exitApp()
    }
help(){
  alert(" Call - Calling\n WA - Direct Watsapp \n Share - Sharing \n Search - GoogleSearch \n Launch - LauchApps");
} 
contact(name,phone){
    global.phonenumber=phone;
    this._MyComponent.setNativeProps({text:'Selected:'+ name});
   }
  Diverter() {
      let command = this.refs.instruction._lastNativeText;
      var a=[]
      var chunks = command.split(/\s+/);
      a = [chunks.shift(), chunks.join(' ')];
      if(a[0].toUpperCase()=="CALL"){
          this.call(phonenumber)  
          this._MyComponent.setNativeProps({text:''});  
      }
       if(a[0].toUpperCase()=="SHARE"){
        if(a[1]!="")
          this.share(a[1])
        else
          alert('Invalid command' )    
      }
      if(a[0].toUpperCase()=="WA"){
         if(a[1]!=""){ 
          this._MyComponent.setNativeProps({text:''});
          this.sendOnWhatsApp(a[1])
          }    
        else
          alert('Invalid command' )
      }
      if(a[0].toUpperCase()=="LAUNCH"){
          if(a[1].toUpperCase()=="YOUTUBE") {              
              this._MyComponent.setNativeProps({text:''});
              Linking.openURL('https://www.google.com/url?sa=t&source=web&rct=j&url=https://m.youtube.com/&ved=2ahUKEwjI9r6ftpXoAhW9yzgGHa4BBO4QjjgwAHoECAgQAw&usg=AOvVaw1gjD0qA2OtrsxdcaNbwsxk') 
          }
          if(a[1].toUpperCase()=="CONTACTS"){
            this._MyComponent.setNativeProps({text:''});
            Linking.openURL('content://com.android.contacts/contacts')
          }
      } 
      if(a[0].toUpperCase()=="SEARCH"){
          var url= "https://www.google.com/search?q="+a[1];
          this._MyComponent.setNativeProps({text:''});
          Linking.openURL(url)
      } 

     
}
  render() {
    return (

      <View style={styles.container}>

      <View style={styles.contacts}>
      <Text style={{color: 'blue', fontSize: 20,fontWeight: 'bold'}}>Starred Contacts</Text>  
        <FlatList 
          data={[
            {Name: 'Amma',Phone: '9894445986'},
            {Name: 'Dad',Phone: '9894101726'},
            {Name: 'Deepika',Phone: '9894656054'},
            {Name: 'Aunt',Phone: '9790162206'},
            {Name: 'Uncle',Phone: '9344165778'},
            {Name: 'Nishok',Phone: '7418336181'},
            {Name: 'Akkash',Phone: '9003875334'},
            {Name: 'Vinith',Phone: '9488590083'},
            {Name: 'Rithish',Phone: '9677712669'},
            {Name: 'Pragadeesh',Phone: '9047595035'},
          ]}       
         renderItem={({item}) => (

              <TouchableWithoutFeedback onPress={ () => this.contact(item.Name,item.Phone)}>
                  <View>
                     <Text style={styles.contactlist}>{item.Name}</Text>               
                  </View>
              </TouchableWithoutFeedback> )}   keyExtractor={(item,index) => index.toString()}/>

        </View>

        <View style={{position: 'absolute', left: 15, right: 30, bottom: 10}} behavior="position">
           <TextInput editable={false} ref={component=> this._MyComponent=component}/> 
          <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ message: text })}
              placeholderTextColor='white'
              underlineColorAndroid='transparent'
              ref='instruction'
            />
          <TouchableOpacity style={styles.inputBut} onPress={this.Diverter.bind(this)}>
          <Text style={styles.go}>Go</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exit}>
          <Text onPress={ () => this.exit('yes') } >Exit</Text>  
        </View>
        <View style={styles.cmds}>
          <Button onPress={ () => this.help() } title="Commands"/>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:7,
    borderRadius:0,
    backgroundColor: '#F0F8FF',
  },
  input: {
    width: '88%',
    alignItems: 'center',
    borderRadius:7,
    height: 45,
    borderColor:'black',
    borderWidth:1,
    bottom:0,
    backgroundColor:'#F8F8FF',
  },
   inputBut: {
    width: '10%',
    borderRadius:20,
    alignItems: 'center',
    height: 50,
    width:50,
    position: 'absolute', 
    bottom: -3,
    right:-5,
    borderColor:'white',
    borderWidth:1,
    backgroundColor:'black',


  },
  go:{
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:9,
    color:'white',
  },
  contacts:{
    borderWidth:2,
    position: 'relative',
    left: 20,
    width:'90%',
    marginTop:50,
    borderColor:'white',
    borderRadius:13,
    backgroundColor:'white',
    flex: 0,
    height:500,

  },
  contactlist:{
     fontSize:15,
     backgroundColor:'#f9c2ff',
     padding:20,
     marginVertical: 4,

  },
  exit:{
   
    backgroundColor:'red',
    width:60,
    height:30,
    right:10,
    marginTop:10,
    position:'absolute',
    alignItems:'center',
    color:'black',
    fontWeight:'bold',
  },
  cmds:{
    width:'50%',
    alignItems:'center',
    left:'24%',
    position:'absolute',
    marginTop:600,
  }
});
