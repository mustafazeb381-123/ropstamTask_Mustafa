import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from '../../app.json';
import back from '../assets/images/back.png';
import {Picker} from '@react-native-picker/picker';
import edit from '../assets/images/edit.png';
import deleteimage from '../assets/images/delete.png';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [color, setColor] = useState(null);
  const [model, setModel] = useState(null);
  const [make, setMake] = useState(null);
  const [registrationNo, setRegistrationNo] = useState(null);
  const [year, setYear] = useState(null);
  const [latestId, setLatestId] = useState(data.cardata.length + 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisisble] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newcardata, setNewCarData] = useState(data.cardata);
  const [handleId, setHandleId] = useState('');


  const cardatalength = data.cardata;
  // Filter the car data based on the search query

  const addnewcar = () => {
    setLoader(true);
    const newCar = {
      id: latestId,
      model: model,
      make: make,
      color: color,
      registration_no: registrationNo,
      model_year: year,
    };

    const user = newcardata.push(newCar);
    console.log('user', user);
    if (user) {
      console.log('carAdded Successfully');
      Alert.alert('success', 'car Added Successfully');
      setModalVisible(!modalVisible);
    } else {
      Alert.alert('error', ' Error');
      console.log('error', 'car Registration Failed Error');
      setModalVisible(!modalVisible);
    }
    setLoader(false);
  };

  const deleteCar = async id => {
    setLoading(true);

    try {
      const index = newcardata.findIndex(item => item.id === id);

      if (index !== -1) {
        newcardata.splice(index, 1);
        const newData = newcardata.filter(item => item.id !== id);
        setNewCarData(newData);

        // Update filteredCarData if needed
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleUpdateModal = id => {
    console.log('update id is comming', id);
    let result = newcardata.find(item => item.id == id);
    console.log('result', result);
    if (result) {
      setColor(result.color);
      setMake(result.make);
      setRegistrationNo(result.registrationNo);
      setYear(result.year);
      setModel(result.model);
      setHandleId(id);
      setVisisble(true);
    }
  };

  const updateCar = async () => {
    try {
      const index = newcardata.findIndex(item => item.id === handleId);

      if (index !== -1) {
        // Create a copy of the cardata array
        const updatedCarData = [...newcardata];

        // Update the car data at the found index
        updatedCarData[index] = {
          ...updatedCarData[index],
          model: model,
          make: make,
          color: color,
          registration_no: registrationNo,
          model_year: year,
        };

        // Update the newcardata state with the modified data
        setNewCarData(updatedCarData);

        // Close the modal
        setVisisble(!visible);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = val => {
    const filteredCarData = data.cardata.filter(
      item =>
        item.model.toLowerCase().includes(val.toLowerCase()) ||
        item.make.toLowerCase().includes(val.toLowerCase()) ||
        item.color.toLowerCase().includes(val.toLowerCase()),
      // item.registration_no.toLowerCase().includes(val.toLowerCase()) ||
      // item.model_year.toString().includes(val.toLowerCase()),
    );
    setNewCarData(filteredCarData);
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backbutton}>
          <Image source={back} />
          <Text style={styles.headerTextView}>DashBoard</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingView}>
          <Text style={styles.headingtext}>Registerd Car Detail</Text>

          <View style={styles.cardetailView}>
            <Text style={styles.registerdcar}>
              No of Car Registerd {newcardata.length}
            </Text>

            <View style={styles.searchView}>
              <TextInput
                // value={searchQuery}
                onChangeText={val => {
                  handleSearch(val);
                }}
                placeholder="Search"
                placeholderTextColor={'black'}
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.addCarsButton}>
              <Text style={{fontSize: 15, color: 'white'}}>Add New Car</Text>
            </TouchableOpacity>

            <View style={{marginBottom: 80}}>
              {loader ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={newcardata}
                  style={{marginTop: 20}}
                  showsVerticalScrollIndicator={false}
                  // numColumns={3}
                  ListEmptyComponent={() => (
                    <Text
                      style={{
                        color: 'black',
                        //   fontFamily: fonts.MontserratBold,
                        alignSelf: 'center',
                        fontSize: 20,
                        paddingTop: '50%',
                      }}>
                      No Data Found
                    </Text>
                  )}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.carCrudView}>
                        <View style={styles.rowView}>
                          <View style={styles.dataView}>
                            <Text style={styles.carText}>car model :</Text>
                            <Text style={styles.cardataText}>{item.model}</Text>
                          </View>

                          <View style={styles.dataView}>
                            <Text style={styles.carText}>car make :</Text>
                            <Text style={styles.cardataText}>{item.make}</Text>
                          </View>

                          <View style={styles.dataView}>
                            <Text style={styles.carText}>car color :</Text>
                            <Text style={styles.cardataText}>{item.color}</Text>
                          </View>

                          <View style={styles.dataView}>
                            <Text style={styles.carText}>car regist-no :</Text>
                            <Text style={styles.cardataText}>
                              {item.registration_no}
                            </Text>
                          </View>

                          <View style={styles.dataView}>
                            <Text style={styles.carText}>car model year :</Text>
                            <Text style={styles.cardataText}>
                              {item.model_year}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.iconsView}>
                          <TouchableOpacity
                            onPress={() => {
                              handleUpdateModal(item.id);
                            }}>
                            {/* <Text style={styles.deleteEdit}>edit</Text> */}
                            <Image
                              source={edit}
                              style={{height: 25, width: 25}}
                            />
                          </TouchableOpacity>

                          {loading ? (
                            <ActivityIndicator color={'black'} />
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                deleteCar(item.id);
                              }}>
                              {/* <Text style={styles.deleteEdit}>Delete</Text> */}
                              <Image
                                source={deleteimage}
                                style={{height: 25, width: 25}}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* update car modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setVisisble(!visible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalinput}>
                <Picker
                  value={model}
                  selectedValue={model}
                  onValueChange={(itemValue, itemIndex) => setModel(itemValue)}>
                  <Picker.Item label="M3" value="M3" />
                  <Picker.Item label="GTR-34" value="GtR-34" />
                  <Picker.Item label="Supra" value="Supra" />
                  <Picker.Item label="RX-7" value="RX-7" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  value={make}
                  selectedValue={make}
                  onValueChange={(itemValue, itemIndex) => setMake(itemValue)}>
                  <Picker.Item label="NISSAN" value="NISSAN" />
                  <Picker.Item label="BMW" value="BMW" />
                  <Picker.Item label="Toyota" value="Toyota" />
                  <Picker.Item label="MAZDA" value="MAZDA" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  value={color}
                  selectedValue={color}
                  onValueChange={(itemValue, itemIndex) => setColor(itemValue)}>
                  <Picker.Item label="RED" value="RED" />
                  <Picker.Item label="BLUE" value="BLUE" />
                  <Picker.Item label="WHITE" value="WHITE" />
                  <Picker.Item label="INDIGO" value="INDIGO" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  value={registrationNo}
                  selectedValue={registrationNo}
                  onValueChange={(itemValue, itemIndex) =>
                    setRegistrationNo(itemValue)
                  }>
                  <Picker.Item label="ABJ" value="ABJ" />
                  <Picker.Item label="FFW" value="FFW" />
                  <Picker.Item label="AAA" value="AAA" />
                  <Picker.Item label="NNN" value="NNN" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  value={year}
                  selectedValue={year}
                  onValueChange={(itemValue, itemIndex) => setYear(itemValue)}>
                  <Picker.Item label="1999" value="1999" />
                  <Picker.Item label="2000" value="2000" />
                  <Picker.Item label="2001" value="2001" />
                  <Picker.Item label="2009" value="2009" />
                  <Picker.Item label="2010" value="2010" />
                  <Picker.Item label="2011" value="2011" />
                </Picker>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateCar();
                }}>
                <Text style={styles.textStyle}>update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* add car modal */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalinput}>
                <Picker
                  selectedValue={model}
                  onValueChange={(itemValue, itemIndex) => setModel(itemValue)}>
                  <Picker.Item label="M3" value="M3" />
                  <Picker.Item label="GTR-34" value="GtR-34" />
                  <Picker.Item label="Supra" value="Supra" />
                  <Picker.Item label="RX-7" value="RX-7" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  selectedValue={make}
                  onValueChange={(itemValue, itemIndex) => setMake(itemValue)}>
                  <Picker.Item label="NISSAN" value="NISSAN" />
                  <Picker.Item label="BMW" value="BMW" />
                  <Picker.Item label="Toyota" value="Toyota" />
                  <Picker.Item label="MAZDA" value="MAZDA" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  selectedValue={color}
                  onValueChange={(itemValue, itemIndex) => setColor(itemValue)}>
                  <Picker.Item label="RED" value="RED" />
                  <Picker.Item label="BLUE" value="BLUE" />
                  <Picker.Item label="WHITE" value="WHITE" />
                  <Picker.Item label="INDIGO" value="INDIGO" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  selectedValue={registrationNo}
                  onValueChange={(itemValue, itemIndex) =>
                    setRegistrationNo(itemValue)
                  }>
                  <Picker.Item label="ABJ" value="ABJ" />
                  <Picker.Item label="FFW" value="FFW" />
                  <Picker.Item label="AAA" value="AAA" />
                  <Picker.Item label="NNN" value="NNN" />
                </Picker>
              </View>
              <View style={styles.modalinput}>
                <Picker
                  selectedValue={year}
                  onValueChange={(itemValue, itemIndex) => setYear(itemValue)}>
                  <Picker.Item label="1999" value="1999" />
                  <Picker.Item label="2000" value="2000" />
                  <Picker.Item label="2001" value="2001" />
                  <Picker.Item label="2009" value="2009" />
                  <Picker.Item label="2010" value="2010" />
                  <Picker.Item label="2011" value="2011" />
                </Picker>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {
                  addnewcar();
                }}>
                {loader ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.textStyle}>Add Car</Text>
                )}
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteEdit: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalinput: {
    width: '100%',
    height: 41,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',

    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    gap: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cardataText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },

  carText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  addCarsButton: {
    width: '100%',
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3478F6',
    marginTop: 20,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    color: 'black',
    height: 51,
  },
  searchView: {
    width: '100%',
    height: 51,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconsView: {
    gap: 20,
  },
  rowView: {
    gap: 10,
  },
  carCrudView: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // marginBottom:100,
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerdcar: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  cardetailView: {
    width: '100%',
    marginTop: 20,
  },
  headingtext: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },

  headingView: {
    width: '100%',
    paddingHorizontal: 21,
    marginTop: 20,
  },
  backbutton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  headerTextView: {
    fontSize: 17,
    fontWeight: '500',
    color: '#3478F6',
  },
  headerView: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 21,
    height: 51,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Dashboard;
