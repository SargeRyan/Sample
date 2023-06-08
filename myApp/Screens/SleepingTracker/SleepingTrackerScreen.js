import React, { useRef, useEffect, useState, } from 'react';
import IMAGE from "../SleepingTracker/Elements/Logo1.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import { differenceInMinutes, differenceInHours } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    ScrollView,
    Switch,
    Text,
    StyleSheet,
    Modal,
    Image,
    } from 'react-native';  
    
const SleepingTrackerTab = () => {
  
////SCROLL BAR DATES

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Get the current day index
const currentDate = new Date();
const currentDayIndex = new Date().getDay();
const currentDay = currentDate.getDate();

// Create a ref for the ScrollView
const scrollViewRef = useRef(null);

// Scroll to the current day on initial render
useEffect(() => {
 if (scrollViewRef.current && currentDayIndex > 0) {
   const containerWidth = 100; // Width of each day container
   const offset = currentDayIndex * containerWidth;
   scrollViewRef.current.scrollTo({ x: offset, animated: true });
 }
}, []);

  ///// REAPEAT DROP BAR
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Select Day');
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsOpen(false);
  };

////MODALS
    const [isParentModalVisible, setParentModalVisible] = useState(false);
    const toggleParentModal = () => {
      setParentModalVisible(!isParentModalVisible);
    };
  
////RADIO BUTTONS
  const [isEnabled1, setIsEnabled] = useState(false);
  const toggleSwitch1 = () => {
    setIsEnabled(previousState => !previousState);

  };
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => {
    setIsEnabled2(previousState => !previousState);
  };


///datepicker

const [isTimePickerVisible1, setTimePickerVisible1] = useState(false);
const [isTimePickerVisible2, setTimePickerVisible2] = useState(false);

const [selectedTime1, setSelectedTime1] = React.useState('00:00 AM');
const [selectedTime2, setSelectedTime2] = React.useState('00:00 AM');



const handleTimeConfirm1 = (time) => {
  const hours = (time.getHours() % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  setSelectedTime1(formattedTime);
  setTimePickerVisible1(false);

};

const handleTimeConfirm2 = (time) => {
  const hours = (time.getHours() % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  setSelectedTime2(formattedTime);
  setTimePickerVisible2(false);
};


const showTimePicker1 = () => {
  setTimePickerVisible1(true);
};

const hideTimePicker1 = () => {
  setTimePickerVisible1(false);
};

const showTimePicker2 = () => {
  setTimePickerVisible2(true);
};

const hideTimePicker2 = () => {
  setTimePickerVisible2(false);
};
////DISPLAY HOURS OF SLEEP

  return (
    <View style={styles.container}>
         <View style={styles.headerContainer}>
         <View style={styles.LeftColumn}>
         <Text style={styles.heading1}>Ideal Sleep For Hours</Text>
         <Text style={styles.SubHeading}>8 Hours and 30 mins</Text>
         <TouchableOpacity style = {styles.appButtonContainer} >
          <Text style = {styles.appButtonText}>Learn More</Text>
          </TouchableOpacity>
         </View>

         <View style={styles.RightColumn}>
         <Image
            style={styles.ExerciseImage}
            source={require("../SleepingTracker/Elements/Logo1.png")}
          />
         </View>
         </View>


         <View style={styles.ScrollsDiv}>
         <Text style={styles.heading2}>Your Schedule</Text>
         <ScrollView
      horizontal
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
    >
      {daysOfWeek.map((day, index) => (
        <View
          key={index}
          style={[styles.dayContainer, index === currentDayIndex && styles.highlightedDayContainer]}
        >
          <Text style={[styles.dayText, index === currentDayIndex && styles.highlightedDayText]}>{day}</Text>
          {index === currentDayIndex && <Text style={styles.dayNumber}>{currentDay}</Text>}
        </View>
      ))}
    </ScrollView>
    </View>

    <View style={styles.ToggleContainer}>
    <Image
           style={{
            display: 'flex',
            resizeMode: 'stretch',
            height:60,
            width:60,
            margin:5,
          }}
            source={require("../SleepingTracker/Elements/BedLogo.png")}
          />
     <View style={{flexDirection:'column'}}>
    <Text style={styles.Toggleheading}>BedTime :</Text>
    <Text style={{flexDirection:'column',paddingHorizontal:5,}}>in 14hours 30min</Text>
    </View>
    <Text style={{fontSize:15,marginTop:17,paddingRight:5,}}>00:00 AM</Text>
      <View style={styles.slideContainer}>
        <Switch 
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
          style={styles.toggleSwitch}
          onValueChange={toggleSwitch1}
          value={isEnabled1}
          />
      </View>
      </View> 
      
    <View style={styles.ToggleContainer}>
    <Image
           style={{
            display: 'flex',
            resizeMode: 'stretch',
            height:60,
            width:60,
            margin:5,
          }}
            source={require("../SleepingTracker/Elements/AlarmLogo.png")}
          />
     <View style={{flexDirection:'column'}}>
    <Text style={styles.Toggleheading}>AlarmTime :</Text>
    <Text style={{flexDirection:'column',paddingHorizontal:5,}}>in 14hours 30min</Text>
    </View>
    <Text style={{fontSize:15,marginTop:17,paddingRight:5,}}>00:00 AM</Text>
      <View style={styles.slideContainer}>
        <Switch 
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
          style={styles.toggleSwitch}
          onValueChange={toggleSwitch2}
          value={isEnabled2}
          />
      </View>
      </View> 

       {/*PARENT MODAL */}
      <TouchableOpacity style={styles.button} onPress={toggleParentModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={isParentModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleParentModal}>
          <Icon name="chevron-left" size={20} color="black" />
       </TouchableOpacity>
          <Text style={{fontSize:20,fontWeight:'bold'}}>SET ALARM</Text>

 {/*BED TIME ALARM */}
          
          <View style={styles.BedTimeContainer}> 
          <View style={styles.ModalLeftColumn}> 
          <Ionicons name="bed" size={44} color="black" />
          <Text style={styles.modalText}>Bed Time :</Text>
          </View>
          <View style={styles.ModalRightColumn}> 
          <Text>{selectedTime1}</Text>
          <TouchableOpacity onPress={showTimePicker1} style={styles.picker}>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isTimePickerVisible1}
          mode="time"
          onConfirm={handleTimeConfirm1}
          onCancel={hideTimePicker1}
        />
            </View>
          </View>
          
 {/*ALARM TIME */}
  
          <View style={styles.BedTimeContainer}> 
          <View style={styles.ModalLeftColumn}> 
          <Ionicons name="alarm-outline" size={44} color="black" styles />
          <Text style={styles.modalText}>Set Alarm Time :</Text>
          </View>
          <View style={styles.ModalRightColumn}>
          <Text>{selectedTime2}</Text>
          <TouchableOpacity onPress={showTimePicker2} style={styles.picker}>
          <Icon name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
          <DateTimePickerModal
          isVisible={isTimePickerVisible2}
          mode="time"
          onConfirm={handleTimeConfirm2}
          onCancel={hideTimePicker2}
        />
          </View>
          </View>
         
 {/*HOURS OF SLEEP */}
  
 <View style={styles.BedTimeContainer}> 
          <View style={styles.ModalLeftColumn}> 
          <Ionicons name="time-outline" size={44} color="black" styles />
          <Text style={styles.modalText}>Total Hours of Sleep :</Text>
          </View>
          <View style={styles.ModalRightColumn}>
          <Text>{''}</Text>
          
          </View>
          </View>

            
 {/*REAPEATING DAY DROP DOWN */}
           <View style={styles.BedTimeContainer}> 
          <View style={styles.ModalLeftColumn}> 
          <Ionicons name="ios-repeat" size={44} color="black" />
          <Text style={styles.modalText}>Repeat On :</Text>
          </View>
          <View style={styles.ModalRightColumn}> 
          <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>{selectedDay || 'Select a day'}</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#000" />
        </TouchableOpacity>
        {isOpen && (
        <View style={styles.dropdownContent}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={styles.dropdownItem}
              onPress={() => handleDaySelect(day)}
            >
              <Text style={styles.dropdownItemText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
          </View>
          </View>
          <TouchableOpacity style={styles.DoneButton} >
                <Text style={styles.DoneText}>DONE</Text>
              </TouchableOpacity>
        </View>
        </Modal>
    </View>
   
  );
      
};


const styles = StyleSheet.create({
    
    container: {
    flex: 1,
    backgroundColor:"#fffff",
    paddingTop:10,
    alignItems: 'center',
    flexDirection:'column',
  },
  //HEADING===
  
  headerContainer: {
    paddingVertical:1,
    width:'90%',
    height: '20%',
    textAlign:'left',
    backgroundColor:"#e2cfb7",
    alignItems: 'center',
    flexDirection:"row",
    borderRadius: 20,
},
appButtonContainer: {
    elevation: 10,
    backgroundColor: "#009688",
    borderRadius: 15,
    marginTop:10,
    marginLeft:-30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  appButtonText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
RightColumn:{
  alignItems: 'center',
  height:'100%',
  padding:3,
  justifyContent:'center',
},
LeftColumn:{
  justifyContent:'center',
  paddingLeft:20,
  textAlignc:'center',
},

  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center'
  },
  SubHeading:{
    fontSize: 14,
    color:"#d19d5b",
  },
    logo:{
    width:120,
    height:120,
    resizeMode:'stretch',
    flex: 1,
    borderRadius: 10,
  
  },
  ///scrollDiv
  heading2: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    alignSelf:'flex-start',
  },
  ScrollsDiv:{
    padding:10,
     height: '35%',
  }, 
  dayContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius:15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation:8,
  },
  highlightedDayContainer: {
    backgroundColor: '#009688', // Set a different background color for the current day
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highlightedDayText: {
    color: 'white', // Set a different text color for the current day
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white",
    marginTop: 5,
  },
  /// Slide
  ToggleContainer:{
    marginTop:20,
    backgroundColor:"white",
    width:'85%',
    elevation:8,
    padding:10,
    borderRadius:15,
    flexDirection:'row'
  },
Toggleheading: {
    marginTop:10,
    fontSize:15,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent:'center',
    padding:8,
    
  },
  slideContainer:{
    alignSelf:'stretch',
    alignSelf:'center',
    marginLeft:10,
  },


  toggleSwitch: {
    
    transform: [{ scaleX: 1.5}, { scaleY: 1.5 }], // Adjust the scale to enlarge the toggle switch
  },
  // MODAL STYLES
  button: {
    alignSelf:'flex-end',
    margin:20,
    backgroundColor: '#009688',
    paddingHorizontal: 20,  
    elevation:8,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 46,
    fontWeight: 'bold',
  },
  //PARENT MODAL INSIDES STYLES
  DoneButton:{
    alignSelf: 'center',
    justifyContent:'center',
    textAlign:'center',
    position:'absolute',
    bottom:50,
    backgroundColor: '#009688',
    padding: 10, 
    marginBottom:'auto',
    elevation:8,
    width:'70%',
    borderRadius: 100,
  },
  DoneText:{
    fontWeight:'bold', 
    color:'white',
    justifyContent:'center',
    textAlign:'center',
    fontSize:20,

  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    padding:5,
    color: 'black',
  },
  closeButton: {
    alignSelf:'flex-start',
    padding: 10,
    paddingHorizontal: 20,  
  },
  BedTimeContainer: {
    justifyContent:'flex-end',
    margin:10,
    backgroundColor: '#fef8ef',
    paddingLeft:20, 
    flexDirection:'row',
    elevation:8,
    borderRadius: 15,
    width:'95%',
    height:'8%',
    alignItems:'flex-end',
  },
  ModalRightColumn:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center',
    height:'100%',
    width:'50%',
    alignSelf:'flex-end',

  },
  ModalLeftColumn:{
    marginTop:5,
    alignItems:'center',
    alignContent:'flex-start',
    flexDirection:'row',
    marginRight:'auto',
    alignSelf:'flex-start',
  },
///REPEAT DROP DOWN
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    
  },
  dropdownHeaderText: {
    fontSize: 16,
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  picker:{
paddingLeft:20,
 marginRight:0,
  },
}
);

    
export default SleepingTrackerTab;
