function HomeScreen(props) {
    let fileUri=''
    const [storySeen,changeStorySeen]=useState(false)
    const [userID,changeUserID]=useState('1')
    const {loading, error, data, fetchMore} = useQuery(GET_ALL_DETAILS, {
      variables: {uid: userID}, client: Client
    });
    const[changeDP,{loading2,error2}]=useMutation(CHANGE_DP)
    if(loading2){
      console.log('Mutation loading')
      return <Text>Mutation Loading..</Text>
    }
    if(error2){
      console.log('Mutation error')
      return <Text>Mutation Error</Text>
    }
    if (loading) {
      console.log('RetrieveUserDetails loading');
      return <Text>Loading.. `${loading}`</Text>
    }
    if (error) {
      console.log('RetrieveUserDetails error');
      return <Text>Error.. `${error.message}`</Text>
    }
    if (data) {
      console.log(data);
      if(data.getUserByID.dpRoute!=fileUri){
        fileUri=data.getUserByID.dpRoute
      }
      return (
        <SafeAreaView>
          <ScrollView>
            <View>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Details'),
                      changeStorySeen(true)
                  }}>
                  <View
                    style={[
                      styles.border,
                      storyBorder({
                        storySeenStatus: storySeen,
                      }),
                    ]}>
                    {fileUri!='' && fileUri!=null ? <Image source={{uri: fileUri}} style={styles.img}/> : <Image source={require('./images/default.png')} style={styles.img} />}
                    {/*<Image source={require('./images/default.png')} style={styles.img}/>*/}
                    {/*<RetrieveDP userNumber={userID} />*/}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.nameArea}>
                <Text style={{fontSize: 30}}>{data.getUserByID.userName}</Text>
                <Text style={{fontSize: 22}}>{data.getUserByID.userLocation}</Text>
              </View>
              <View style={{ margin: 5,marginTop:50}}>
                <TouchableOpacity onPress={()=> {
                  changeUserID('1');
                  changeStorySeen(false)
                }}>
                  <Text style={{color: 'white',fontSize: 20, backgroundColor:'blue'}}>Set userID = 1</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 5}}>
                <TouchableOpacity onPress={()=> {
                  changeUserID('2');
                  changeStorySeen(false)
                }}>
                  <Text style={{color: 'white',fontSize: 20, backgroundColor:'blue'}}>Set userID = 2</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 5}}>
                <TouchableOpacity onPress={()=> {
                  changeUserID('3');
                  changeStorySeen(false)
                }}>
                  <Text style={{color: 'white',fontSize: 20, backgroundColor:'blue'}}>Set userID = 3</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 5}}>
                <TouchableOpacity onPress={async()=> {
                  let x=await launchImageLibrary();
                  console.log("X is ",x," and fileUri is ",fileUri);
                  changeDP({variables: {uid: userID,dp:x},client:Client}).then(console.log("Img inserted in DB, ",x))
                  if(x!=fileUri){
                    fileUri=x
                    console.log("Now X is ",x," and fileUri is ",fileUri);
                    fetchMore({uid: userID});
                  }
                }}>
                  <Text style={{color: 'white',fontSize: 20, backgroundColor:'blue'}}>Choose DP from Gallery</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 5}}>
                <TouchableOpacity onPress={async()=> {
                  let y=await launchCamera();
                  changeDP({variables: {uid: userID,dp:y},client:Client}).then(console.log("Img inserted in DB, ",x))
                  if(y!=fileUri){
                    fileUri=y
                    fetchMore({uid: userID});
                  }
                }}>
                  <Text style={{color: 'white',fontSize: 20, backgroundColor:'blue'}}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )
    }
  }
  function App() {
    return (
      <ApolloProvider client={Client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
  export default App;