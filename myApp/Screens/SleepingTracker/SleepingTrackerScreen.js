import React, { useRef, useEffect, useState, } from 'react';
import IMAGE from "../SleepingTracker/Elements/Logo.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import { differenceInMinutes, differenceInHours } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";
import {schedulePushNotification} from "../SleepingTracker/AlarmNotification";

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

  const fetchAllData = async () => {
    try {
      // Get all the keys stored in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      // Fetch the data for each key
      const dataPairs = await AsyncStorage.multiGet(keys);
  
      // Create an array to store the FinalhoursDiff values for each day of the week
  
      // Process each data pair
      dataPairs.forEach(([key, value]) => {
        // Parse the value as JSON
        const data = JSON.parse(value);
  
        // Access the individual properties
        const { id, alarmTime, bedTime, FinalhoursDiff } = data;
        console.log("---------------------------");
        console.log("Fetched Sleeping Data for ID:", id);
        console.log("Alarm Time:", alarmTime);
        console.log("Bed Time:", bedTime);
        console.log("Hours Difference:", FinalhoursDiff);
        console.log("---------------------------");
  
       // Check if id matches the index in daysOfWeek array
       if (id === currentDayIndex.toString()) {
        setSelectedDashBoardAlarmTime1(alarmTime);
        setSelectedDashBoardBedTime1(bedTime);
      }
      });
      
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  fetchAllData();
   //ALARM AND BED FUNCTION

   const [selectedDashBoardBedTime1, setSelectedDashBoardBedTime1] = useState('12:00 AM');
   const [selectedDashBoardAlarmTime1, setSelectedDashBoardAlarmTime1] = useState('12:00 AM');
 
   const convertTo24HourFormat = (timeString) => {
     const [time, meridiem] = timeString.split(' ');
     const [hours, minutes] = time.split(':');
     let convertedHours = parseInt(hours, 10);
 
     if (meridiem === 'PM' && convertedHours !== 12) {
       convertedHours += 12;
     } else if (meridiem === 'AM' && convertedHours === 12) {
       convertedHours = 0;
     }
 
     return {
       hours: convertedHours,
       minutes: parseInt(minutes, 10),
     };
   };
 
  let FunctionbedTime = convertTo24HourFormat(selectedDashBoardBedTime1);
  let FunctionalarmTime = convertTo24HourFormat(selectedDashBoardAlarmTime1);
 
   // Access the converted values
   let bedTimeHoursInt = FunctionbedTime.hours;
   let bedTimeMinutesInt = FunctionbedTime.minutes;
   let alarmTimeHoursInt = FunctionalarmTime.hours;
   let alarmTimeMinutesInt = FunctionalarmTime.minutes;
 

  useEffect(() => {
    schedulePushNotification(parseInt(bedTimeHoursInt), parseInt(bedTimeMinutesInt), "Time for Bed ", "Be on time For your Bed!"); // Bedtime Alarm
    schedulePushNotification(parseInt(alarmTimeHoursInt), parseInt(alarmTimeMinutesInt), "Time to wakeUp ", "Be on time to Wake Up!"); // AlarmTime Alarm
    console.log("BED HOURS: "+bedTimeHoursInt);
    console.log("BED MIN:"+bedTimeMinutesInt);
    console.log("ALARM HOUR: "+ alarmTimeHoursInt);
    console.log("ALARM Min: "+alarmTimeMinutesInt);

if (scrollViewRef.current && currentDayIndex > 0) {
 const containerWidth = 100; // Width of each day container
 const offset = currentDayIndex * containerWidth;
 scrollViewRef.current.scrollTo({ x: offset, animated: true });
}
}, []);
////SCROLL BAR DATES

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Get the current day index
const currentDate = new Date();
const currentDayIndex = new Date().getDay();
const currentDay = currentDate.getDate();

// Create a ref for the ScrollView
const scrollViewRef = useRef(null);
// Scroll to the current day on initial render


  ///// REAPEAT DAYs DROP BAR
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

let [selectedBedTime1, setSelectedBedTime1] = React.useState('00:00 AM');
let [selectedAlarmTime2, setSelectedAlarmTime2] = React.useState('00:00 AM');

let handleTimeConfirm1 = (time) => {
  let hours = (time.getHours() % 12 || 12).toString().padStart(2, '0');
  let minutes = time.getMinutes().toString().padStart(2, '0');
  let ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  let formattedTime = `${hours}:${minutes} ${ampm}`;
  setSelectedBedTime1(formattedTime);
  setTimePickerVisible1(false);

};

let handleTimeConfirm2 = (time) => {
  let hours = (time.getHours() % 12 || 12).toString().padStart(2, '0');
  let minutes = time.getMinutes().toString().padStart(2, '0');
  let ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  let formattedTime = `${hours}:${minutes} ${ampm}`;
  setSelectedAlarmTime2(formattedTime);
  setTimePickerVisible2(false);
};
const calculateTimeDifference = () => {
  // Parse the bed time and alarm time strings
  const bedTime = selectedBedTime1.split(' ')[0];
  const alarmTime = selectedAlarmTime2.split(' ')[0];

  // Extract hours and minutes from bed time
  let bedHours = parseInt(bedTime.split(':')[0], 10);
  let bedMinutes = parseInt(bedTime.split(':')[1], 10);
  let bedAMPM = selectedBedTime1.split(' ')[1];

  // Extract hours and minutes from alarm time
  let alarmHours = parseInt(alarmTime.split(':')[0], 10);
  let alarmMinutes = parseInt(alarmTime.split(':')[1], 10);
  let alarmAMPM = selectedAlarmTime2.split(' ')[1];

// Convert bedHours to 24-hour format
if (bedAMPM === 'PM' && bedHours !== 12) {
  bedHours += 12;
} else if (bedAMPM === 'AM' && bedHours === 12) {
  bedHours = 0;
}

// Convert alarmHours to 24-hour format
if (alarmAMPM === 'PM' && alarmHours !== 12) {
  alarmHours += 12;
} else if (alarmAMPM === 'AM' && alarmHours === 12) {
  alarmHours = 0;
}

let hoursDiff=0;
  // Calculate the difference in hours and minutes


  if (alarmHours > bedHours) {
    hoursDiff = alarmHours - bedHours  ;
   
  }
   else if (alarmHours < bedHours) {
    hoursDiff = bedHours - alarmHours ;
   }
  
  

  let minutesDiff = alarmMinutes - bedMinutes;
  // Handle cases where minutes difference is negative
  if (minutesDiff < 0) {
    minutesDiff += 60;
    hoursDiff -= 1;
  }
 
  // Convert the difference to a formatted string
  const diffString = `${hoursDiff}:${minutesDiff.toString().padStart(2, '0') }`;
  return diffString;
};
// Call the calculateTimeDifference function whenever needed
const timeDifference = calculateTimeDifference();

const GetHoursDiff = () => {
  let GraphHours = parseInt(timeDifference.split(':')[0], 10);
  return GraphHours;
}
const FinalGraphHours = GetHoursDiff();

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
/// Day index of The Drop bar
const [selectedDayIndex, setSelectedDayIndex] = useState(-1);

const handleDropBarDaySelect = (day) => {
  let index = daysOfWeek.indexOf(day);
  setSelectedDayIndex(index);
};
 
/// hoursDiff,selectedBedTime1,selectedAlarmTime2,selectedDAyIndex

   // Generate the ID using selectedDayIndex
  const id = selectedDayIndex.toString();
  const alarmTime = selectedAlarmTime2;
  const bedTime = selectedBedTime1;
  const FinalhoursDiff = FinalGraphHours.toString();

  
 // GraphData ();
const saveSleepingData = async () => {
  try {
    // Create an object with the data to be saved
    const data = {
      id,
      alarmTime,
      bedTime,
      FinalhoursDiff,
    };
    /// set chart data 
    

    // Save the data to AsyncStorage
    await AsyncStorage.setItem(id, JSON.stringify(data));
    console.log("Saved Sleeping Data:");
    console.log("Alarm Time:", alarmTime);
    console.log("Bed Time:", bedTime);
    console.log("Hours Difference:", FinalhoursDiff);
    console.log("ID:",id );
  } catch (error) {
    console.log('Error saving data:', error);
  }
}
const fetchSleepingData = async () => {
  try {
    // Fetch the data from AsyncStorage
    const dataString = await AsyncStorage.getItem(id);

    if (dataString) {
      // Parse the data as JSON
      const data = JSON.parse(dataString);

      // Access the individual properties
      const { alarmTime, bedTime, FinalhoursDiff } = data;

      console.log("Fetched Sleeping Data:");
      console.log("Alarm Time:", alarmTime);
      console.log("Bed Time:", bedTime);
      console.log("Hours Difference:", FinalhoursDiff);
      console.log("ID:", id);
    } else {
      console.log("No data found for the provided ID:", id);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}
///Chart 

let finalHoursDiffValues =[0];


const chartConfig = {
  backgroundGradientFrom: "#009688", // Set background color to full black
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#009688", // Set background color to full black
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Set font color to white
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true 
};
const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth * 0.9; // Adjust the chart width as desired
const chartHeight = 170; // Adjust the chart height as desired

const Graphdata = {
  labels: ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri" ,"Sat"],
  datasets: [
    {
      data: finalHoursDiffValues,// Initialize an empty array for FinalhoursDiff values
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ["Sleeping Hours"],
}; 
const clearAllData = async () => {
  try {
    // Clear all data from AsyncStorage
    await AsyncStorage.clear();
    console.log("Cleared all data from AsyncStorage.");
  } catch (error) {
    console.log('Error clearing data:', error);
  }
}

//DASH BOAD TIMERS display VALUE

// this will set ALARM FUNCTION

const ButtonSave = () => {
  saveSleepingData();
  fetchAllData();
  //clearAllData();
  //fetchSleepingData();
  toggleParentModal();
  }
 
    return (
    <ScrollView style={{ backgroundColor: "#afd3e2" }}>
    <View style={styles.container}>
   
         <LineChart
          data={Graphdata}
          style={{ borderRadius: 20 ,color:'white'}}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
            />
          
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
    <Text style={{fontSize:15,marginTop:17,paddingRight:5,}}>{selectedDashBoardBedTime1}</Text>
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
    <Text style={{fontSize:15,marginTop:17,paddingRight:5,}}>{selectedDashBoardAlarmTime1}</Text>
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
          <Ionicons name="bed-outline" size={44} color="black" />
          <Text style={styles.modalText}>Set Bed Time :</Text>
          </View>
          <View style={styles.ModalRightColumn}> 
          <Text>{selectedBedTime1}</Text>
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
          <Text>{selectedAlarmTime2}</Text>
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
          <Text> {timeDifference} Hours:Mins</Text>
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
       {daysOfWeek.map((day, index) => (
         <TouchableOpacity
           key={day}
           style={styles.dropdownItem}
           onPress={() =>  {
            handleDaySelect(day);
            handleDropBarDaySelect(day);
          }}
         >
           <Text style={[styles.dropdownItemText, selectedDayIndex === index && styles.selectedItemText]}>
             {day}
           </Text>

         </TouchableOpacity>
       ))}
     </View>
      )}
          </View>
          </View>
          <TouchableOpacity style={styles.DoneButton} onPress={ButtonSave}>
      <Text style={styles.DoneText}>DONE</Text>
          </TouchableOpacity>
        </View>
        </Modal>  
    </View>
    </ScrollView>
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
  //HEADING
  headerContainer: {
    paddingVertical:1,
    width:'99%',
    height: '28%',
    textAlign:'left',
    backgroundColor:"#009688",
    alignItems: 'center',
    flexDirection:"row",
    borderRadius: 20,
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
    resizeMode:'cover',
    flex: 1,
    borderRadius: 10,
  
  },
  ///scrollDiv
  heading2: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    alignSelf:'flex-start',
  },
  ScrollsDiv:{
     height: '23%',
    
  }, 
  dayContainer: {
    width: 80,
    height: 80,
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
    fontSize: 13,
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
    marginTop:10,
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
    marginHorizontal:15,
    alignSelf:'flex-end',
    backgroundColor: '#009688',
    paddingHorizontal: 20,  
    margin:20,
    marginBottom:45,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  //PARENT MODAL INSIDES STYLES
  DoneButton:{
    alignSelf: 'center',
    justifyContent:'center',
    textAlign:'center',
    position:'absolute',
    zIndex:-1,
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
    backgroundColor: 'white',
    zIndex: 2 ,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderRadius:2,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
    backgroundColor:'white',
  },
  picker:{
  paddingLeft:20,
   marginRight:0,
  },
}
);    
export default SleepingTrackerTab;
