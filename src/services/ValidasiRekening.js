import axios from 'axios';
import {getRequestToken} from "./PostRequest";

export function ValidasiRekening(url, rekening){
    //Create body from username and password
    var token = getRequestToken(url).then((result) =>{
        var formBody =
            '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<S:Body>' +
            '<ns2:isRekeningExist xmlns:ns2="http://publisher/">' +
            '  <arg0>' + rekening + '</arg0>' +
            '  <arg1>' + 'abcdef' + '</arg1>' +
            '</ns2:isRekeningExist>' +
            '</S:Body>' +
            '</S:Envelope>';

        console.log(formBody);
        var lastResult = '';

        const veryLastResult = () => {
            return axios.post(url, formBody, {
                headers : {
                    'user-agent': 'sampleTest',
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

                    lastResult = jsonObj['S:Envelope']['S:Body']['ns2:isRekeningExistResponse']['return'];
                    console.log(lastResult);
                }
                return lastResult;
            }).catch((error) => {
                console.log(error);
            });
        }

        return veryLastResult();
    });

    return token;
}