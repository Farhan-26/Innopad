import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import TextField from '../../../components/textInput';
import {useFormik} from 'formik';
import {addProductValidation, loginValidation} from '../../../validations';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';

const AddProduct = () => {
  const navigation = useNavigation();

  const [imageData, setImgaeData] = useState();
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [base64, setBase64] = useState('');
  const [error, setErrors] = useState('');

  const convertImageToBase64 = async uri => {
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const reader = new FileReader();

      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64String = reader.result.replace(
          /^data:image\/(png|jpeg|jpg);base64,/,
          '',
        );

        setBase64(base64String);
      };
    } catch (error) {
      console.log('Error converting image to base64:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary()
      .then(result => {
        if (result?.assets?.[0]?.uri !== '') {
          convertImageToBase64(result?.assets[0]?.uri);
          setImgaeData(result);
        }
      })
      .catch(() => {
        console.log('Error');
      });
  };

  const apiCall = values => {
    const prepareData = {
      image: base64,
      category_id: values.categoryId,
      product_name: values.productName,
      price: values.price,
      description: values.description,
    };

    fetch(
      'https://www.innopadsolutions.com/projects/androidapi/webservice/AddProduct',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prepareData),
      },
    )
      .then(res => {
        if (res.status === 200) {
          console.log(res, 'res');
          resetForm();
          setImgaeData();
          setBase64('');
          navigation.navigate('ProductListing');
        }
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      categoryId: '',
      productName: '',
      price: '',
      description: '',
    },
    validationSchema: addProductValidation,
    onSubmit: values => {
      if (imageData) {
        apiCall(values);
      } else {
        setErrors('select image');
      }
    },
  });

  const getCategoryList = () => {
    fetch(
      'https://www.innopadsolutions.com/projects/androidapi/webservice/getCategory',
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code === 200) {
          let listArry = [];
          responseJson?.data.forEach((value, index) => {
            listArry.push({
              label: value.category_name,
              value: value.id,
            });
          });
          setCategory(listArry);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.addProduct}>Add Product</Text>
      </View>
      {imageData && (
        <View style={{marginBottom: 10}}>
          <FastImage
            style={styles.image}
            source={{
              uri: imageData?.assets?.[0]?.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          height: 40,
          width: Dimensions.get('window').width * 0.4,
          borderRadius: 20,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 14, color: '#fff', fontWeight: '600'}}>
          Select Image
        </Text>
      </TouchableOpacity>

      <View style={{marginBottom: 8, zIndex: 999}}>
        <Text style={styles.label}>Category Id</Text>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          items={category}
          placeholder="Select Category"
          containerStyle={styles.dropdownContainer}
          value={values.categoryId}
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          dropDownStyle={styles.dropdownList}
          onSelectItem={item => {
            setFieldValue('categoryId', item.value);
          }}
        />
        {touched.categoryId && errors.categoryId && (
          <Text style={styles.errors}>{errors.categoryId}</Text>
        )}
      </View>

      <TextField
        labelText="ProductName"
        placeholder="ProductName"
        onChangeText={handleChange('productName')}
        value={values.productName}
        error={touched.productName ? errors.productName : ''}
      />
      <TextField
        labelText="Price"
        placeholder="Price"
        onChangeText={handleChange('price')}
        value={values.price}
        error={touched.price ? errors.price : ''}
      />
      <TextField
        labelText="Description"
        placeholder="Description"
        onChangeText={handleChange('description')}
        value={values.description}
        error={touched.description ? errors.description : ''}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    height: Dimensions.get('window').height * 1,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loginBtn: {
    height: 45,
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
  },
  addProduct: {
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 30,
    color: '#000011',
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
  },
  image: {
    width: 130,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  dropdownContainer: {
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 15,
    height: 40,
    marginBottom: 13,
    zIndex: 999,
    height: 42,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    borderRadius: 15,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    marginTop: -1,
    backgroundColor: '#fafafa',
  },
  label: {
    color: '#000',
    marginBottom: 8,
    marginLeft: 10,
    fontSize: 15,
  },
  errors: {
    fontSize: 12,
    color: 'red',
    marginLeft: 8,
    marginBottom: 3,
  },
});

export default AddProduct;
