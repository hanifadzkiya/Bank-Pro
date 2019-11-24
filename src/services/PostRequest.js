import axios from 'axios';
import Cookies from 'universal-cookie';

export function getRequestToken(url) {
    //Create body from username and password
    var formBody =
        '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<S:Body>' +
        '<ns2:getRequestToken xmlns:ns2="http://publisher/">' +
        '</ns2:getRequestToken>' +
        '</S:Body>' +
        '</S:Envelope>';

    var lastResult = '';
    const veryLastResult = () => {
        return axios.post(url, formBody, {
            headers : {
                'Content-Type': 'text/xml',
                'Accept' : '*/*',
                'Cache-Control' : 'no-cache'
            }
        }).then((response) => {
            if(response.status === 200){
                // console.log(response);
                // console.log(response.data);
                let result = response.data;
                var parser = require('fast-xml-parser');
                var he = require('he');

                var options = {
                    attributeNamePrefix : "@_",
                    attrNodeName: "attr", //default is 'false'
                    textNodeName : "#text",
                    ignoreAttributes : true,
                    ignoreNameSpace : false,
                    allowBooleanAttributes : false,
                    parseNodeValue : true,
                    parseAttributeValue : false,
                    trimValues: true,
                    cdataTagName: "__cdata", //default is 'false'
                    cdataPositionChar: "\\c",
                    localeRange: "", //To support non english character in tag/attribute values.
                    parseTrueNumberOnly: false,
                    arrayMode: false, //"strict"
                    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
                    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
                    stopNodes: ["parse-me-as-string"]
                };

                var tObj = parser.getTraversalObj(response.data,options);
                var jsonObj = parser.convertToJson(tObj,options);

                lastResult = jsonObj['S:Envelope']['S:Body']['ns2:getRequestTokenResponse']['return'];
                // console.log(lastResult);
            }
            return lastResult;
        }).catch((error) => {
            console.log(error);
        });
    };
    return veryLastResult();
}

export function PostWithSOAP(url, rekening){
    //Create body from username and password
    var token = getRequestToken(url).then((result) =>{
        var formBody =
            '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<S:Body>' +
            '<ns2:getRekeningDetail xmlns:ns2="http://publisher/">' +
            '  <arg0>' + rekening + '</arg0>' +
            '  <arg1>' + 'abcdef' + '</arg1>' +
            '</ns2:getRekeningDetail>' +
            '</S:Body>' +
            '</S:Envelope>';

        var lastResult = '';

        const veryLastResult = () => {
            return axios.post(url, formBody, {
                headers : {
                    'Content-Type': 'text/xml',
                    'Accept' : '*/*',
                    'Cache-Control' : 'no-cache'
                }
            }).then((response) => {
                if(response.status === 200){
                    // console.log(response);
                    // console.log(response.data);
                    let result = response.data;
                    var parser = require('fast-xml-parser');
                    var he = require('he');

                    var options = {
                        attributeNamePrefix : "@_",
                        attrNodeName: "attr", //default is 'false'
                        textNodeName : "#text",
                        ignoreAttributes : true,
                        ignoreNameSpace : false,
                        allowBooleanAttributes : false,
                        parseNodeValue : true,
                        parseAttributeValue : false,
                        trimValues: true,
                        cdataTagName: "__cdata", //default is 'false'
                        cdataPositionChar: "\\c",
                        localeRange: "", //To support non english character in tag/attribute values.
                        parseTrueNumberOnly: false,
                        arrayMode: false, //"strict"
                        attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
                        tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
                        stopNodes: ["parse-me-as-string"]
                    };

                    var tObj = parser.getTraversalObj(response.data,options);
                    var jsonObj = parser.convertToJson(tObj,options);

                    lastResult = jsonObj['S:Envelope']['S:Body']['ns2:getRekeningDetailResponse']['return'];
                }
                return lastResult;
            }).catch((error) => {
                console.log(error);
            });
        };

        return veryLastResult();
    });

    return token;
}

export function callTransactionService(NomorPengirim, NomorPenerima, Nominal){
    var url = 'https://cors-anywhere.herokuapp.com/3.1.12.44:8080/ws-bank_war/services/wsbank';

    var token = getRequestToken(url).then((result) =>{
        var sr =
            '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<S:Body>' +
            '<ns2:transfer xmlns:ns2="http://publisher/">' +
            '  <arg0>'+NomorPengirim+'</arg0>' +
            '  <arg1>'+NomorPenerima+'</arg1>' +
            '  <arg2>'+Nominal+'</arg2>' +
            '  <arg3>' + 'abcdef' + '</arg3>' +
            '</ns2:transfer>' +
            '</S:Body>' +
            '</S:Envelope>';

        axios.post(url,
            sr,
            {headers:
                    {   'user-agent': 'sampleTest',
                        'Content-Type': 'text/xml',
                        'Accept' : '*/*',
                        'Cache-Control' : 'no-cache'}
            }).then(res=>{
            // console.log(res);
            alert("Transfer berhasil sebesar "+Nominal+" ke rekening "+NomorPenerima);
        }).catch(err=>{
            console.log(err);
            alert("Transfer gagal, mohon cek saldo atau rekening tujuan anda");
        });
        alert("Mohon tunggu sampai pesan konfirmasi muncul");
    });

}