import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { Formik } from "formik";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Data from './Data.json';

const initialFormValues = {
    AraçSahibi: "",
    Adres: "",
    Modeli: "",
    Rengi: "",
    Şasi: "",
    Km: "",
    Tipi: "",
    Plaka: "",
    Motor: "",
    DosyaNo: "",
    EksperAdı: "",
    SigortaŞirketi: ""
};


const App = () => {
    const [malzeme, setMalzeme] = useState<Array<any>>([]);
    const [pdfFile, setPdfFile] = useState<any>();

    const generatePdf = async (formValues: any) => {
        const options = {
            html: `
        <div style='display: flex; align-items: center; justify-content: center;'>
            <img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOS5SKXZ1El_bEeHpCFn4srnoEOREOmESSDCaoJMVLVRPmwWEzf_Z_hjWqprRiVDIR0BVVdfs3F-hfXGY07Yb0gm2CHLMw=w1280-h891' style="width:55px;height:55px;">
            <h1 style='margin-left: 10px;'>Pars Motors</h1>
        </div>
        <table border="1" style='width: 100%; max-width: 100%;  border-collapse: collapse;'>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Araç Sahibi </th>
            <td style="width: 34%;word-break:break-all;">${formValues.AraçSahibi}</td>
            <th style='width: 16%;'>Adres </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Adres}</td>
          </tr>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Modeli </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Modeli}</td>
            <th style='width: 16%;'>Rengi </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Rengi}</td>
          </tr>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Şasi </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Şasi}</td>
            <th style='width: 16%;'>Km </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Km}</td>
          </tr>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Tipi </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Tipi}</td>
            <th style='width: 16%;'>Plaka </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Plaka}</td>
          </tr>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Motor </th>
            <td style="width: 34%;word-break:break-all;">${formValues.Motor}</td>
            <th style='width: 16%;'>Dosya No </th>
            <td style="width: 34%;word-break:break-all;">${formValues.DosyaNo}</td>
          </tr>
          <tr style='max-width: 50%; width: 50%;'>
            <th style='width: 16%;'>Eksper Adı </th>
            <td style="width: 34%;word-break:break-all;">${formValues.EksperAdı}</td>
            <th style='width: 16%;'>Sigorta Şirketi </th>
            <td style="width: 34%;word-break:break-all;">${formValues.SigortaŞirketi}</td>
          </tr>
        </table>
        <div style='margin-top: 10px'>
          ${malzeme.map(e => { return `<li style='display:inline-flex; margin-top: 10px; margin-left: 20px;'>${e}</li>` })}
        </div>
      `,
            fileName: formValues.AraçSahibi + formValues.Plaka,
            directory: "Pdf",
        }
        const file = await RNHTMLtoPDF.convert(options);
        Alert.alert(
            '✅ Kaydedildi',
            `Pdf Konumu= ${file.filePath}
               Pdf Adı= ${formValues.AraçSahibi + formValues.Plaka}.pdf
            `,
            [
                {
                    text: 'Pdf Aç',
                    onPress: () => openFile(file.filePath),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]
        );
    }

    const openFile = (filepath: any) => {
        const path = filepath;
        FileViewer.open(path)
    }

    const openPdf = async (pdfname: string) => {
        const file = `/storage/emulated/0/Android/data/com.parsmotors/files/Pdf/${pdfname}.pdf`
        FileViewer.open(file);
    }

    return (
        <>
            <StatusBar backgroundColor={'#000'} />
            <View style={styles.headercontainer}>
                <Image
                    style={styles.headerimage}
                    source={require("./pngwing.jpg")}
                />
                <Text style={styles.headertitle}>
                    Pars Motors
                </Text>
            </View>

            <Formik
                initialValues={initialFormValues}
                onSubmit={generatePdf}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <>
                        <ScrollView style={styles.container}>
                            <View style={styles.inputallcontainer}>
                                <Text style={styles.inputallcontainertitle}>
                                    Hakkında
                                </Text>
                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.AraçSahibi.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Araç Sahibi
                                        </Text>
                                        <TextInput
                                            placeholder='ARAÇ SAHİBİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('AraçSahibi')}
                                            value={values.AraçSahibi}
                                            onBlur={handleBlur('AraçSahibi')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Adres.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Adres
                                        </Text>
                                        <TextInput
                                            placeholder='ADRES'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Adres')}
                                            value={values.Adres}
                                            onBlur={handleBlur('Adres')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Modeli.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Modeli
                                        </Text>
                                        <TextInput
                                            placeholder='MODELİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Modeli')}
                                            value={values.Modeli}
                                            onBlur={handleBlur('Modeli')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Rengi.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Rengi
                                        </Text>
                                        <TextInput
                                            placeholder='RENGİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Rengi')}
                                            value={values.Rengi}
                                            onBlur={handleBlur('Rengi')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Şasi.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Şasi
                                        </Text>
                                        <TextInput
                                            placeholder='ŞASİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Şasi')}
                                            value={values.Şasi}
                                            onBlur={handleBlur('Şasi')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Km.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Km
                                        </Text>
                                        <TextInput
                                            placeholder='KM'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Km')}
                                            value={values.Km}
                                            onBlur={handleBlur('Km')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Tipi.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Tipi
                                        </Text>
                                        <TextInput
                                            placeholder='TİPİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Tipi')}
                                            value={values.Tipi}
                                            onBlur={handleBlur('Tipi')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Plaka.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Plaka
                                        </Text>
                                        <TextInput
                                            placeholder='PLAKA'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Plaka')}
                                            value={values.Plaka}
                                            onBlur={handleBlur('Plaka')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.Motor.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Motor
                                        </Text>
                                        <TextInput
                                            placeholder='MOTOR'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('Motor')}
                                            value={values.Motor}
                                            onBlur={handleBlur('Motor')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.DosyaNo.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Dosya  No
                                        </Text>
                                        <TextInput
                                            placeholder='DOSYA NO'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('DosyaNo')}
                                            value={values.DosyaNo}
                                            onBlur={handleBlur('DosyaNo')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputcontainer}>
                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.EksperAdı.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Eksper Adı
                                        </Text>
                                        <TextInput
                                            placeholder='EKSPER ADI'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('EksperAdı')}
                                            value={values.EksperAdı}
                                            onBlur={handleBlur('EksperAdı')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>

                                    <View style={[
                                        styles.inputinnercontainer,
                                        {
                                            borderColor:
                                                1 > values.SigortaŞirketi.length
                                                    ? '#FFBE1C'
                                                    : '#32cd32',
                                        }
                                    ]}>
                                        <Text style={styles.inputtext}>
                                            Sigorta Şirketi
                                        </Text>
                                        <TextInput
                                            placeholder='SİGORTA ŞİRKETİ'
                                            placeholderTextColor={'gray'}
                                            onChangeText={handleChange('SigortaŞirketi')}
                                            value={values.SigortaŞirketi}
                                            onBlur={handleBlur('SigortaŞirketi')}
                                            style={styles.input}
                                            autoCapitalize='words'
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.listcontainer}>
                                <Text style={styles.listcontainertitle}>
                                    Malzeme Listesi
                                </Text>
                                {
                                    Data.map((e) => {
                                        const [tick, settick] = useState<boolean>(false);

                                        const HandleMalzeme = (value: string) => {
                                            if (tick === true) {
                                                settick(false)
                                                setMalzeme(oldValues => {
                                                    return oldValues.filter(fruit => fruit !== value)
                                                })
                                            } else {
                                                settick(true)
                                                setMalzeme([...malzeme, value])
                                            }
                                        }

                                        return (
                                            <TouchableOpacity
                                                onPress={() => HandleMalzeme(e.value)}
                                                key={e.id}
                                            >
                                                <View style={styles.listinnercontainer}>
                                                    <View style={[
                                                        styles.listimleç,
                                                        tick ? {
                                                            borderColor: '#32cd32',
                                                            backgroundColor: '#32cd32',
                                                        } : {
                                                            borderColor: '#FFBE1C',
                                                            backgroundColor: '#000',
                                                        }
                                                    ]}></View>
                                                    <Text style={styles.listtitle}>
                                                        {e.title}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        )
                                    })
                                }
                            </View>
                            <View style={styles.pdfopencontainer}>
                                <View style={[styles.inputinnercontainer, { borderColor: '#32cd32' }]}>
                                    <Text style={styles.inputtext}>
                                        Pdf Arama
                                    </Text>
                                    <TextInput
                                        placeholder='Araç Sahibi + Plaka'
                                        placeholderTextColor={'gray'}
                                        onChangeText={setPdfFile}
                                        style={styles.pdfopeninput}
                                    />
                                </View>

                            </View>
                        </ScrollView >
                        <TouchableOpacity
                            onPress={() => openPdf(pdfFile)}
                            style={styles.pdfopenbutton}
                        >
                            <MaterialCommunityIcons
                                name='file-search-outline'
                                color={'#fff'}
                                size={32}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.pdfbuttoncontainer}
                            onPress={handleSubmit}
                        >
                            <AntDesign
                                name='addfile'
                                color={'#fff'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </Formik>

        </>
    )
}

export default App;

const styles = StyleSheet.create({
    headercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingVertical: 5
    },
    headerimage: {
        width: 39,
        height: 39,
        resizeMode: 'contain'
    },
    headertitle: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 10,
        fontWeight: '500'
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        //marginBottom: 45,
        backgroundColor: '#000'
    },
    titletext: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center'
    },
    inputallcontainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: 15
    },
    inputallcontainertitle: {
        color: '#fff',
        position: 'absolute',
        fontSize: 22,
        top: -16,
        left: Dimensions.get('screen').width / 2.8,
        backgroundColor: '#000'
    },
    inputcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputinnercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFBE1C',
        marginTop: 15,
        borderRadius: 7
    },
    inputtext: {
        borderColor: 'red',
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#000',
        position: 'absolute',
        zIndex: 999,
        top: -14,
        left: 5
    },
    input: {
        maxHeight: 40,
        height: 40,
        width: 170,
        maxWidth: 170,
        color: '#fff'
    },
    listcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        gap: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        paddingVertical: 15
    },
    listcontainertitle: {
        color: '#fff',
        position: 'absolute',
        fontSize: 22,
        top: -16,
        left: Dimensions.get('screen').width / 4,
        backgroundColor: '#000'
    },
    listinnercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: 10
    },
    listimleç: {
        borderWidth: 1,
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 3
    },
    listtitle: {
        fontSize: 17,
        color: '#fff'
    },
    pdfbuttoncontainer: {
        borderWidth: 5,
        borderColor: '#FFBE1C',
        backgroundColor: '#000',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 40,
        position: 'absolute',
        bottom: 0,
        right: 35
    },
    pdfopencontainer: {
        flexDirection: 'row',
        //marginTop: 6,
        marginBottom: 22,
        //paddingBottom: 22,
        //alignItems: 'center',
    },
    pdfopeninput: {
        maxHeight: 40,
        height: 40,
        width: 210,
        maxWidth: 210,
        color: '#fff',
    },
    pdfopenbutton: {
        borderWidth: 2,
        borderColor: '#32cd32',
        borderRadius: 25,
        padding: 6,
        marginLeft: 10,
        marginTop: 10,
        position: 'absolute',
        bottom: 15,
        right: 105,
        backgroundColor: '#000',
    }
})