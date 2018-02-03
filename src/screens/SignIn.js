import React, { Component } from 'react';
import { Text, StyleSheet, View, ImageBackground, AsyncStorage } from 'react-native';
import {
  Container,
  Footer,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label
} from 'native-base';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Card, CardStart, Spinner } from '../components';
import background from '../image/background.jpg';
import { emailChanged, passwordChanged, loginUser, loginUserSuccess, authentication } from '../actions';

class SignIn extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      //console.log(user)
      if (user) {
        try {
          this.props.authentication()
        } catch (error) {
          //console.log(error)
        }
      }   
    })
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        style={styles.button}
      >
      <Text style={styles.textButton}> Sign In </Text>
      </Button>
    );
  }


  render() {
    const { container, footer, textSignUp, form } = styles;
    return (
      <Container style={container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <View style={styles.circle} />
          <Content>
            <View>
              <Text style={styles.title}>Login to Join Chat</Text>
              <Form style={form}>
                <Item floatingLabel>
                  <Label style={{ color: 'black' }}>Email</Label>
                  <Input
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                  />
                </Item>
                <Item floatingLabel last>
                  <Label style={{ color: 'black' }}>Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </Item>
                  <Text style={styles.errorStyle}>{this.props.error} </Text>
                <CardStart>
                  {this.renderButton()}
                </CardStart>
              </Form>
            </View>
          </Content>
          <Footer style={footer}>
            <Text>Dont have account? </Text>
            <Text
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={textSignUp}
            >
              Sign up.
            </Text>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = ({ authsign }) => {
  const { email, password, error, loading } = authsign;

  return { email, password, error, loading };
};

export default connect(mapStateToProps,{
  emailChanged, passwordChanged, loginUser, 
  loginUserSuccess, authentication

})(SignIn);

const styles = StyleSheet.create({
  checkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  form: {
    // marginTop: 60,
    backgroundColor: 'rgba(0,0,0, 0.1)',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
  },
  errorStyle : {
    textAlign: 'center',
    fontSize: 16,
    color: 'red'
  },
  title: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black'
  },
  circle: {
    borderColor: '#004930',
    borderWidth: 30,
    height: 300,
    width: 300,
    borderRadius: 300,
    position: 'absolute',
    bottom: -100,
    left: -150
  },
  button: {
    backgroundColor: '#004930',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f6f6f9'
  },
  textSignUp: {
    color: '#15d6c8',
    fontWeight: 'bold'
  }
});
