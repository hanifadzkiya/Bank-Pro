import axios from 'axios';

export function PostWithSOAP(url, rekening){
    //Create body from username and password
    var formBody =
        '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<S:Body>' +
        '<ns2:getRekeningDetail xmlns:ns2="http://publisher/">' +
        '  <arg0>' + rekening + '</arg0>' +
        '</ns2:getRekeningDetail>' +
        '</S:Body>' +
        '</S:Envelope>';

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

                // if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
                //     var jsonObj = parser.parse(xmlData,options);
                // }

// Intermediate obj
                var tObj = parser.getTraversalObj(response.data,options);
                var jsonObj = parser.convertToJson(tObj,options);

                lastResult = jsonObj['S:Envelope']['S:Body']['ns2:getRekeningDetailResponse']['return']['listTransaksi'];
                // console.log(result);
                // console.log(result['0']);
            }
            return lastResult;
        }).catch((error) => {
            console.log(error);
        });
    }

    return veryLastResult();
}