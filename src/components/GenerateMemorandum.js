import React, { Component} from 'react';
import jsPDF from 'jspdf'
import { isMobile, osName} from "react-device-detect"
//Global Variables
var lineHeight = 1.15,
  margin = 1,
  fontSize = 12,
  ptsPerInch = 72,
  oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
var LSGETDEPARTMENT;
var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETUNIT;
var LSGETBASE;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;
var LSGETDUALSIGNATURE;
var LSGETRANK2;
var LSGETWRITERSNAME2;
var LSGETDUTYTITLE2;
var LSGETBRANCH2;
var LSGETNUMBEROFPARAGRAPHS;
var LSGETADVHEADING;
var LSGETNUMBEROFATTN;
var LSGETNUMBEROFFROM;
let DATEHEIGHT = 1.75 + .14;
let ATTNHEIGHT = DATEHEIGHT + oneLineHeight;
let FROMHEIGHT = ATTNHEIGHT + (oneLineHeight * 2);
let SUBJECTHEIGHT = FROMHEIGHT + (oneLineHeight * 2);
let PARAONEHEIGHT = SUBJECTHEIGHT + (oneLineHeight * 2);
var cursorY = 0;
//Generate pdf object as 'pdf'
var pdf = new jsPDF({
  orientation: 'p',
  unit: "in",
  format: 'letter'
});

function addWrappedText({ text, textWidth, pdf, fontSize = 12, fontType = 'normal', lineSpacing, xPosition, initialYPosition, pageWrapInitialYPosition = 1}) {
  pdf.setFont("times", fontType);
  pdf.setFontSize(fontSize);
  var textLines = pdf.splitTextToSize(text, textWidth); // Split the text into lines
  var pageHeight = pdf.internal.pageSize.height - 1; // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`
  cursorY = initialYPosition;
  textLines.forEach(lineText => {
    if (cursorY > pageHeight) { // Auto-paging
      pdf.addPage();
      cursorY = pageWrapInitialYPosition;
    }
    pdf.text(xPosition, cursorY, lineText);
    cursorY += lineSpacing;
  })
}

function insertMultipleParagraphs() {
  // Get paragraph array from sessionStorage
  const paragraphArray = JSON.parse(sessionStorage.getItem('paragraphArray') || '[]');
  
  paragraphArray.forEach((paragraph, index) => {
    // Add main paragraph
    var PARAGRAPH = (index + 1) + '.  ' + paragraph.paraInfo;
    addWrappedText({
      text: PARAGRAPH,
      textWidth: 6.5,
      pdf,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight,
      xPosition: margin,
      initialYPosition: cursorY + oneLineHeight,
      pageWrapInitialYPosition: 1
    });
    
    // Add subparagraphs if any
    if (paragraph.subparagraphs && paragraph.subparagraphs.length > 0) {
      paragraph.subparagraphs.forEach((subparagraph, subIndex) => {
        var SUBPARAGRAPH_LABEL = '     ' + String.fromCharCode(97 + subIndex) + '.  ';
        var SUBPARAGRAPH_TEXT = subparagraph.subparagraphInfo || subparagraph;
        addWrappedText({
          text: SUBPARAGRAPH_LABEL + SUBPARAGRAPH_TEXT,
          textWidth: 6.5,
          pdf,
          fontSize: '12',
          fontType: 'normal',
          lineSpacing: oneLineHeight,
          xPosition: margin,
          initialYPosition: cursorY + oneLineHeight,
          pageWrapInitialYPosition: 1
        });
        
        // Add sub-sub paragraphs if any
        if (subparagraph.subSubparagraphs && subparagraph.subSubparagraphs.length > 0) {
          subparagraph.subSubparagraphs.forEach((subSubparagraph, subSubIndex) => {
            var SUBSUBPARAGRAPH_LABEL = '          (' + (subSubIndex + 1) + ')  ';
            var SUBSUBPARAGRAPH_TEXT = subSubparagraph;
            addWrappedText({
              text: SUBSUBPARAGRAPH_LABEL + SUBSUBPARAGRAPH_TEXT,
              textWidth: 6.5,
              pdf,
              fontSize: '12',
              fontType: 'normal',
              lineSpacing: oneLineHeight,
              xPosition: margin,
              initialYPosition: cursorY + oneLineHeight,
              pageWrapInitialYPosition: 1
            });
          });
        }
      });
    }
  });
}

function insertAdvancedATTN() {
  cursorY = 2.273333333336667;
  LSGETNUMBEROFATTN = sessionStorage.getItem("extraATTN");
  LSGETNUMBEROFFROM = sessionStorage.getItem("extraFROM")
  LSGETADVHEADING = sessionStorage.getItem("adv").split(',')
  if (LSGETNUMBEROFATTN === 0){
  }else{
  for (var index = 0; index < LSGETNUMBEROFATTN; index++) {
    console.log(cursorY)
    var ATTN = LSGETADVHEADING[index]
    addWrappedText({
      text: ATTN, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: 2.71, // Text offset from left of document
      initialYPosition: cursorY, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}}

function insertAdvancedFROM() {
  LSGETNUMBEROFFROM = sessionStorage.getItem("extraFROM")
  LSGETADVHEADING = sessionStorage.getItem("adv").split(',')
  cursorY += oneLineHeight;
  if (LSGETNUMBEROFFROM === 0){
  }else{
  for (var index = 0; index < LSGETNUMBEROFFROM; index++) {
    var ATTN = LSGETADVHEADING[index + 2]
    addWrappedText({
      text: ATTN, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: 1.61, // Text offset from left of document
      initialYPosition: cursorY, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}}

// Function to determine if first rank is senior to second rank
function isRankSenior(rank1, rank2) {
  const rankOrder = {
    'C1C': 1, 'C2C': 2, 'C3C': 3, 'C4C': 4,
    'SSgt': 5, 'TSgt': 6, 'MSgt': 7, 'SMSgt': 8, 'CMSgt': 9,
    '2d Lt': 10, '1st Lt': 11, 'Capt': 12, 'Maj': 13,
    'Lt. Col.': 14, 'Colonel': 15, 'Brigadier General': 16,
    'Major General': 17, 'Lieutenant General': 18, 'General': 19
  };
  
  const rank1Order = rankOrder[rank1] || 0;
  const rank2Order = rankOrder[rank2] || 0;
  
  return rank1Order > rank2Order;
}

class GenerateMemorandum extends Component {
  generateWrappedMemorandum3 = () => {
    //set Document font information
    //HEADER
    //Insert header DOD logo
    pdf.addImage(sessionStorage.getItem('MemoHeaderLogoBase').toString(), 'PNG', .4, .4, 1, 1)

    //DEPARTMENT
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(LSGETDEPARTMENT, 4.25, .845, null, null, "center");

    //BASE
    pdf.setFont("helvetica", "normal");
    pdf.text(LSGETUNIT, 4.25, 1.039, "center");
    pdf.text(LSGETBASE, 4.25, 1.039 + oneLineHeight, "center");




    //HEADING
    pdf.setFont('times', 'normal');
    //Date
    pdf.text(LSGETDATE, 7.5, DATEHEIGHT, null, null, "right");


    //MEMORANDUM FOR:
    pdf.text("MEMORANDUM FOR  " + LSGETATTN.toUpperCase(), 1, ATTNHEIGHT);
    insertAdvancedATTN();

    pdf.text("FROM:  " + LSGETFROM.toUpperCase(), 1, cursorY += oneLineHeight);
    insertAdvancedFROM();


    pdf.text("SUBJECT:  " + LSGETSUBJECT, 1, cursorY += oneLineHeight);
    //PARAGRAPHS
    cursorY += oneLineHeight; // Add extra space before paragraphs
    
    // Add references if they exist
    const references = sessionStorage.getItem("references");
    if (references && references.trim() !== "") {
      const referenceLines = references.split('\n');
      referenceLines.forEach((line, index) => {
        if (line.trim() !== "") {
          if (index === 0) {
            // First reference: two spaces after colon
            pdf.text("References:  " + line.trim(), 1, cursorY += oneLineHeight);
          } else {
            // Subsequent references: aligned under the first one
            pdf.text("                      " + line.trim(), 1, cursorY += oneLineHeight);
          }
        }
      });
      cursorY += oneLineHeight; // Add extra space after references
    }
    
    insertMultipleParagraphs();


    //SIGNATURE BLOCK
    if (LSGETDUALSIGNATURE === 'true' || LSGETDUALSIGNATURE === true) {
      // Dual signature: junior on left, senior on right (4.5 inches from left edge)
      // Determine which is junior/senior by comparing ranks
      var isFirstSenior = isRankSenior(LSGETRANK, LSGETRANK2);
      
      if (isFirstSenior) {
        // First signer is senior (right), second signer is junior (left)
        pdf.text(LSGETWRITERSNAME2 + ', ' + LSGETRANK2 + ', ' + LSGETBRANCH2, 1, cursorY + (oneLineHeight * 5));
        pdf.text(LSGETDUTYTITLE2, 1, cursorY + (oneLineHeight * 6));
        
        pdf.text(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH, 4.5, cursorY + (oneLineHeight * 5));
        pdf.text(LSGETDUTYTITLE, 4.5, cursorY + (oneLineHeight * 6));
      } else {
        // First signer is junior (left), second signer is senior (right)
        pdf.text(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH, 1, cursorY + (oneLineHeight * 5));
        pdf.text(LSGETDUTYTITLE, 1, cursorY + (oneLineHeight * 6));
        
        pdf.text(LSGETWRITERSNAME2 + ', ' + LSGETRANK2 + ', ' + LSGETBRANCH2, 4.5, cursorY + (oneLineHeight * 5));
        pdf.text(LSGETDUTYTITLE2, 4.5, cursorY + (oneLineHeight * 6));
      }
    } else {
      // Single signature block (centered)
      pdf.text(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH, 4.5, cursorY + (oneLineHeight * 5));
      pdf.text(LSGETDUTYTITLE, 4.5, cursorY + (oneLineHeight * 6));
    }
    pdf.setProperties({
      title: LSGETSUBJECT,
    })


    //OS Detection for movile and various browsers. Generation incurrs errors depending on browser
    if (osName === 'Mac OS') {
      var string = pdf.output('datauristring');
      var x = window.open();
      x.document.open();
      x.document.location = string;
    } else if (isMobile) {
      window.open(pdf.output('bloburl'))
    } else {
      var elseString = pdf.output('bloburi');
      var embed = "<iframe width='100%' type='application/pdf' height='100%' src='" + elseString + "'/>"
      var elseX = window.open();
      elseX.document.open();
      elseX.document.write(embed);
      elseX.document.close();
    }
    //Reinitialize the pdf to clear previous states
    pdf = new jsPDF({
      orientation: 'p',
      unit: "in",
      format: 'letter'
    });
  }


fillVariables() {
    LSGETDEPARTMENT = sessionStorage.getItem("department");
    LSGETATTN = sessionStorage.getItem("attn");
    LSGETFROM = sessionStorage.getItem("from");
    LSGETSUBJECT = sessionStorage.getItem("subject");
    LSGETPARA = sessionStorage.getItem("para1");
    LSGETUNIT = sessionStorage.getItem("unit");
    LSGETBASE = sessionStorage.getItem("base");
    LSGETDATE = sessionStorage.getItem("date");
    LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
    LSGETRANK = sessionStorage.getItem("rank");
    LSGETWRITERSNAME = sessionStorage.getItem("writersname");
    LSGETBRANCH = sessionStorage.getItem("branch");
    LSGETDUALSIGNATURE = sessionStorage.getItem("dualSignature");
    LSGETRANK2 = sessionStorage.getItem("rank2");
    LSGETWRITERSNAME2 = sessionStorage.getItem("writersname2");
    LSGETDUTYTITLE2 = sessionStorage.getItem("dutytitle2");
    LSGETBRANCH2 = sessionStorage.getItem("branch2");
  }
  render() {
    this.fillVariables();
    return (<div style={{display:'inline', marginRight: '1rem'}}>
      <button 
        onClick={this.generateWrappedMemorandum3} 
        type="submit"
        style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #ee5a52 100%)', 
          border: 'none', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '10px', 
          fontSize: '16px', 
          fontWeight: '600', 
          cursor: 'pointer', 
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
          minWidth: '160px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 25px rgba(255, 107, 107, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
        }}
      >
        📄 Generate PDF
      </button>
    </div>)
  }
}

export default GenerateMemorandum;
