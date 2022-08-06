const logo = require('../images/logo');

const emailView = ({ email, otpCode, msgType, dateDisplay, subject }) => {
  return {
    from: process.env.NODEMAILER_SENDER,
    to: email,
    subject,
    html: `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;"
          author="nasution"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        <title>Email Template | Reset Passowrd</title>
    
        <style type="text/css">
    
    
          #outlook a { padding:0; }
          body{ width:100% !important; -webkit-text; size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; }
          .ReadMsgBody { width: 100%; }
          .ExternalClass {width:100%;}
          .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
          table td {border-collapse: collapse;}
          .ExternalClass * {line-height: 115%;}
    
          @media screen and (max-width: 630px){
              *[class="mobile-column"] {display: block !important;}
              *[class="mob-column"] {float: none !important;width: 100% !important;}
              *[class="hide"] {display:none !important;}
              *[class="100p"] {width:100% !important; height:auto !important; border:0 !important;}
              *[class="100pNoPad"] {width:100% !important; height:auto !important; border:0 !important;padding:0 !important;}
              *[class="condensed"] {padding-bottom:40px !important; display: block;}
              *[class="center"] {text-align:center !important; width:100% !important; height:auto !important;}
              *[class="100pad"] {width:100% !important; padding:20px;}
              *[class="100padleftright"] {width:100% !important; padding:0 20px 0 20px;}
          }
    
          @media screen and (max-width: 300px){
              *[class="100padtopbottom"] {width:100% !important; padding:0px 0px 40px 0px; display: block; text-align: center !important;}
          }
        </style>
      </head>
    
      <body style="padding: 0; margin: 0; font-family: 'Poppins', sans-serif;" >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin: 0"
          width="100%"
        >
          <tr>
            <td height="30"></td>
          </tr>
          <tr >
            <td align="center" valign="top" >
              <table
                width="640"
                cellspacing="0"
                cellpadding="0"
                bgcolor="#ffffff"
                class="100p"
                style="
                  border-radius: 10px;
                  border: 1px solid #e2e5e7;
                  overflow: hidden;
                "
              >
                <tr>
                  <td height="20"></td>
                </tr>
                <tr>
                  <td width="640" valign="top" class="100p">
                    <!-- Header -->
                    <table
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      width="640"
                      class="100p"
                    >
                      <tr>
                        <td
                          colspan="2"
                          width="640"
                          height="160"
                          class="100p"
                          align="center"
                        >
                          <img
                            alt="Logo"
                            src=cid:hijab-meezha
                            width="100px"
                            style="max-width: 140px; display: block"
                            border="0"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          align="center"
                          valign="center"
                          width="640"
                          height="40"
                          class="100p center"
                          style="
                            font-weight: bold;
                            font-size: 18px;
                            padding: 0px 20px;
                            color: #3A4F5C;
                          "
                        >
                          <p><b>Hi, ${email}</b></p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          align="center"
                          valign="center"
                          width="640"
                          height="40"
                          class="100p center"
                          style="
                            font-weight: bold;
                            font-size: 16px;
                            padding: 0px 20px;
                            color: #3A4F5C;
                          "
                        >
                          <p>
                            <b>
                              Please enter the 6-digit authentication code below in your ${msgType.toLowerCase()} step
                            </b>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          align="center"
                          valign="center"
                          width="640"
                          height="40"
                          class="100p center"
                          style="
                            font-weight: bold;
                            font-size: 30px;
                            padding: 0px 20px;
                            color: black;
                          "
                        >
                          <p>
                            <b>
                              ${otpCode}
                            </b>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          align="center"
                          valign="center"
                          width="640"
                          height="40"
                          class="100p center"
                          style="
                            font-size: 14px;
                            line-height: 1;
                            color: rgba(58, 79, 92, 0.8);;
                          "
                        >
                          <p>
                            *) This OTP code is valid until <span><b>${dateDisplay}</b></span>
                          </p>
                          <p>
                            *) If you didn't make this request, please ignore this message
                          </p>
                          <p>
                            *) If you encounter any difficulties please contact brilian.rachmad13@gmail.com
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          align="center"
                          valign="center"
                          width="640"
                          height="20"
                          class="100p center"
                          style="
                            font-weight: bold;
                            font-size: 1px;
                            padding: 0px 20px;
                          "
                        ></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
    attachments: [
      {
        filename: 'hijab-meezha.png',
        path: logo,
        cid: 'hijab-meezha',
      },
    ],
  };
};

module.exports = { emailView };
