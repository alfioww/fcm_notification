import React, { Component } from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
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
import { connect } from 'react-redux';
import { enterEmail, enterPassword, signUp, nameChanged } from '../actions';
import { Card, CardStart, Spinner } from '../components';
import background from '../image/background.jpg';

class SignUp extends Component {
  nameText(text) {
    this.props.nameChanged(text);
  }

  onEmailChange(text) {
    this.props.enterEmail(text);
  }

  onPasswordChange(text) {
    this.props.enterPassword(text);
  }

  onSignupPress() {
    const { email, password, name } = this.props;

    this.props.signUp({ email, password, name });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button style={styles.button} onPress={this.onSignupPress.bind(this)}>
        <Text style={styles.textButton}> Sign Up </Text>
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
              <Text style={styles.title}>Enter Email dan Password</Text>
              <Form style={form}>
                <Item floatingLabel>
                  <Label style={{ color: 'black' }}>Nama</Label>
                  <Input
                    onChangeText={this.nameText.bind(this)}
                    value={this.props.name}
                  />
                </Item>
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
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 25,
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
    top: -100,
    right: -150
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

const mapStateToProps = ({ authsignup }) => {
  const { name, email, password, loading, error } = authsignup;

  return { name, email, password, loading, error };
};

export default connect(mapStateToProps,{enterEmail, enterPassword, signUp, nameChanged})(SignUp);



// import React,{Component} from 'react';
// import {Text} from 'react-native';
//
// export default class SignUP extends Component {
//
//   render() {
//     return (
//       <Text>ini Home</Text>
//     );
//   }
// }
