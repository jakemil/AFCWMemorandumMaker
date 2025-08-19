import React, { Component} from 'react';
import Moment from 'moment';
import ParagraphInputs from "./AdditionalParagraphs";
import AdditionalHeaderInfo from "./AdditionalHeaderInfo"
import '.././App.css';

var extraParagraphs;
var formattedDateTwo;
var currentDate = new Date();
currentDate.setDate(currentDate.getDate());


class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      department: 'DEPARTMENT OF THE AIR FORCE',
      departmentNameUpper: "DEPARTMENT OF THE AIR FORCE",
      unit: 'United States Air Force Academy',
      base: 'Cadet Squadron 15',
      attn: 'Insert Receiver of Memorandum Here',
      from: 'Insert Sender Information Here',
      subject: 'Insert Subject Here',
      dutytitle: "Enter Signer's Position Here",
      rank: "",
      writersname: "Insert Signer's Name FIRST MI. LAST",
      branch: "USAF",
      dualSignature: false,
      rank2: "",
      writersname2: "",
      dutytitle2: "",
      branch2: "USAF",
      references: '',
      attachments: [],
      paragraphArray: [
        {
          paraInfo: "",
          subparagraphs: []
        }
      ],
      showModal: false
    };
    this.state = {
      rank: "",
      branch: "USAF",
      dualSignature: false,
      rank2: "",
      writersname2: "",
      dutytitle2: "",
      branch2: "USAF",
      references: '',
      attachments: [],
      paragraphArray: [
        {
          paraInfo: "",
          subparagraphs: []
        }
      ],
      showModal: false
    };

    this.handleChangeUpper = this.handleChangeUpper.bind(this);
  }

  handleParagraphChange = (e) => {
    if (["paraInfo"].includes(e.target.className)) {
      var paragraphArray = [...this.state.paragraphArray]
      paragraphArray[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({
        paragraphArray
      })
    } else {
      const {name, value, type, checked} = e.target;
      this.setState({
        [name]: type === 'checkbox' ? checked : value
      });
    }
  }

  handleSubparagraphChange = (e) => {
    if (["subparagraphInfo"].includes(e.target.className)) {
      const paragraphId = parseInt(e.target.dataset.paragraphid, 10);
      const subId = parseInt(e.target.dataset.subid, 10);
      let paragraphArray = [...this.state.paragraphArray];
      
      // Handle both old string format and new object format
      if (typeof paragraphArray[paragraphId].subparagraphs[subId] === 'string') {
        // Convert old string format to new object format
        paragraphArray[paragraphId].subparagraphs[subId] = {
          subparagraphInfo: e.target.value,
          subSubparagraphs: []
        };
      } else {
        // Update existing object format
        paragraphArray[paragraphId].subparagraphs[subId].subparagraphInfo = e.target.value;
      }
      
      this.setState({ paragraphArray });
    }
  }

  handleSubSubparagraphChange = (e) => {
    if (["subSubparagraphInfo"].includes(e.target.className)) {
      const paragraphId = parseInt(e.target.dataset.paragraphid, 10);
      const subId = parseInt(e.target.dataset.subid, 10);
      const subSubId = parseInt(e.target.dataset.subsubid, 10);
      let paragraphArray = [...this.state.paragraphArray];
      paragraphArray[paragraphId].subparagraphs[subId].subSubparagraphs[subSubId] = e.target.value;
      this.setState({ paragraphArray });
    }
  }

  addParagraph = (e) => {
    this.setState((prevState) => ({
      paragraphArray: [
        ...prevState.paragraphArray, {
          paraInfo: "",
          subparagraphs: []
        }
      ]
    }));
  }

  addSubparagraphToLast = (e) => {
    this.setState((prevState) => {
      if (prevState.paragraphArray.length === 0) return {};
      const paragraphArray = [...prevState.paragraphArray];
      const lastIdx = paragraphArray.length - 1;
      if (!paragraphArray[lastIdx].subparagraphs) {
        paragraphArray[lastIdx].subparagraphs = [];
      }
      paragraphArray[lastIdx].subparagraphs.push("");
      return { paragraphArray };
    });
  }

  addParagraphAfter = (index) => {
    this.setState((prevState) => {
      const paragraphArray = [...prevState.paragraphArray];
      paragraphArray.splice(index + 1, 0, {
        paraInfo: "",
        subparagraphs: []
      });
      return { paragraphArray };
    });
  }

  addSubparagraphTo = (paragraphIndex) => {
    this.setState((prevState) => {
      const paragraphArray = [...prevState.paragraphArray];
      if (!paragraphArray[paragraphIndex].subparagraphs) {
        paragraphArray[paragraphIndex].subparagraphs = [];
      }
      paragraphArray[paragraphIndex].subparagraphs.push({
        subparagraphInfo: "",
        subSubparagraphs: []
      });
      return { paragraphArray };
    });
  }

  addSubSubparagraphTo = (paragraphIndex, subparagraphIndex) => {
    this.setState((prevState) => {
      const paragraphArray = [...prevState.paragraphArray];
      if (!paragraphArray[paragraphIndex].subparagraphs[subparagraphIndex].subSubparagraphs) {
        paragraphArray[paragraphIndex].subparagraphs[subparagraphIndex].subSubparagraphs = [];
      }
      paragraphArray[paragraphIndex].subparagraphs[subparagraphIndex].subSubparagraphs.push("");
      return { paragraphArray };
    });
  }

  addAttachment = () => {
    this.setState((prevState) => ({
      attachments: [
        ...prevState.attachments,
        {
          description: "",
          officeOfOrigin: "",
          typeOfCommunication: "",
          date: "",
          copies: 1,
          file: null
        }
      ]
    }));
  }

  removeAttachment = (index) => {
    this.setState((prevState) => {
      const attachments = [...prevState.attachments];
      attachments.splice(index, 1);
      return { attachments };
    });
  }

  handleAttachmentChange = (index, field, value) => {
    this.setState((prevState) => {
      const attachments = [...prevState.attachments];
      attachments[index][field] = value;
      return { attachments };
    });
  }

  handleFileUpload = (index, file) => {
    if (file && file.type === 'application/pdf') {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState((prevState) => {
          const attachments = [...prevState.attachments];
          attachments[index].file = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result // base64 string
          };
          return { attachments };
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState((prevState) => {
        const attachments = [...prevState.attachments];
        attachments[index].file = null;
        return { attachments };
      });
    }
  }

  showModal = e => {
      this.setState({
        showModal: !this.state.showModal
      });
    };

  refreshForm = () =>{
    this.setState({attn: sessionStorage.getItem("attn")});
    this.setState({from: sessionStorage.getItem("from")});
  }

  handleChangeUpper(event) {
    const {name} = event.target;
    var targetName;
    if(name === "writersname"){
      targetName = "writersNameUpper"
    }else if(name === "department"){
      targetName = "departmentNameUpper"
    }
    this.setState({
      [targetName]: event.target.value.toUpperCase()
    });

  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  clearForm = memorandum => {
    console.log("clearForm button pressed");
    //Uses this pre'generated memorandum to submit and refresh
    this.setState({
      memorandum: [
        {
          department: " ",
          attn: " ",
          from: " ",
          subject: " ",
          unit: " ",
          base: " ",
          date: " ",
          dutytitle: " ",
          rank: " ",
          writersname: " ",
          branch: " "
        }
      ]
    });
    sessionStorage.clear();
    alert("The information in your memorandum has been cleared.");
    window.location.reload();
  }

  componentDidMount() {
    setTimeout(() => {
    //Get variables from sessionStorage to enabled editing of the form post submission
    this.setState({departmentNameUpper: sessionStorage.getItem("department")});
    this.setState({department: sessionStorage.getItem("department")});
    this.setState({unit: sessionStorage.getItem("unit")});
    this.setState({base: sessionStorage.getItem("base")});
    this.setState({attn: sessionStorage.getItem("attn")});
    this.setState({from: sessionStorage.getItem("from")});
    this.setState({subject: sessionStorage.getItem("subject")});
    this.setState({references: sessionStorage.getItem("references")});
    this.setState({writersNameUpper: sessionStorage.getItem("writersname")});
    this.setState({writersname: sessionStorage.getItem("writersname")});
    this.setState({rank: sessionStorage.getItem("rank")});
    this.setState({dutytitle: sessionStorage.getItem("dutytitle")});
    
    // Load dual signature fields
    this.setState({dualSignature: sessionStorage.getItem("dualSignature") === 'true'});
    this.setState({rank2: sessionStorage.getItem("rank2") || ""});
    this.setState({writersname2: sessionStorage.getItem("writersname2") || ""});
    this.setState({dutytitle2: sessionStorage.getItem("dutytitle2") || ""});
    this.setState({branch2: sessionStorage.getItem("branch2") || "USAF"});
    
    // Load attachments
    const savedAttachments = sessionStorage.getItem("attachments");
    if (savedAttachments) {
      this.setState({attachments: JSON.parse(savedAttachments)});
    }
    
    extraParagraphs = sessionStorage.getItem("extraParagraphs")

    if(sessionStorage.getItem("branch") === null){}else{
      this.setState({branch: sessionStorage.getItem("branch")});
    }

    //Checks if extra paragraphs is null
    if(extraParagraphs == null){
    }else{
    this.setState({paragraphArray: JSON.parse(sessionStorage.getItem('paragraphArray'))})
  }

  //Process date Default (Current Date) vs edit date based on submission
  if(sessionStorage.getItem("date") !== null){
  formattedDateTwo = Moment(sessionStorage.getItem("date"), ['DDMMMMY', 'YYYYMMDD']).format('YYYY-MM-DD');
  } else{
  formattedDateTwo = Moment(currentDate.toISOString()).format('YYYY-MM-DD');
  }

    //Prep form state for default value of todays date
    this.setState({ date: formattedDateTwo })
  }, 200)
  }

  removeParagraph = (index) => {
    this.setState((prevState) => {
      let paragraphArray = [...prevState.paragraphArray];
      if (paragraphArray.length > 1) {
        paragraphArray.splice(index, 1);
      }
      return { paragraphArray };
    });
  }

  removeSubparagraph = (paragraphIdx, subIdx) => {
    this.setState((prevState) => {
      let paragraphArray = [...prevState.paragraphArray];
      if (paragraphArray[paragraphIdx] && paragraphArray[paragraphIdx].subparagraphs) {
        paragraphArray[paragraphIdx].subparagraphs.splice(subIdx, 1);
      }
      return { paragraphArray };
    });
  }

  removeSubSubparagraph = (paragraphIdx, subIdx, subSubIdx) => {
    this.setState((prevState) => {
      let paragraphArray = [...prevState.paragraphArray];
      if (paragraphArray[paragraphIdx] && 
          paragraphArray[paragraphIdx].subparagraphs && 
          paragraphArray[paragraphIdx].subparagraphs[subIdx] &&
          paragraphArray[paragraphIdx].subparagraphs[subIdx].subSubparagraphs) {
        paragraphArray[paragraphIdx].subparagraphs[subIdx].subSubparagraphs.splice(subSubIdx, 1);
      }
      return { paragraphArray };
    });
  }

  render() {
    const { department, attn, from, subject, unit, base, dutytitle, rank, writersname, } = this.initialState;
      //Identifies type and DOM target for each <td></td> type located on Table.js
      let { paragraphArray } = this.state;
      return (

      <div style={{display: 'inline-block'}} class="w3-padding w3-round-xlarge w3-modal-content w3-card-4 w3-animate-zoom">

      <AdditionalHeaderInfo onClose={this.showModal} refreshForm={this.refreshForm} show={this.state.showModal} />

      <form class="formContainer w3-padding" id="memorandumForm" onSubmit={this.onFormSubmit} onChange={this.handleParagraphChange}>


        <label>Header</label>
        {

        //HEADER INFO

        }
        <table style={{marginBottom: '15'}}>
        <tr>
        <th>
          <input
            type="text"
            name="department"
            id="department"
            value = {this.state.departmentNameUpper}
            onChange = {this.handleChangeUpper}
            placeholder={department}
            />
        </th>
        <th></th>
        <th>
          <input
            type="text"
            name="unit"
            id="unit"
            value={this.state.unit}
            placeholder={unit}
            required />
        </th>
        </tr>

        <tr>
        <th>
          <input
            type="text"
            name="base"
            id="base"
            value={this.state.base}
            placeholder={base}
            />
        </th>
        <th></th>
        <th>

          <input
            style={{height: '50px'}}
            type="date"
            name="date"
            id="date"
            value={this.state.date}
            defaultValue={formattedDateTwo}
            />
        </th>
        </tr>
        {
        //SECOND LINE
        }
        <tr>
        <th>
          <input type="text"
          name="attn"
          id="attn"
          value={this.state.attn}
          placeholder={attn}
          required/>
        </th>

        <th style={{textAlign: 'center'}}>


        <div class="tooltip"><icon onClick={this.showModal} style={{fontSize: '1.25rem'}} className="fa fa-plus-circle" />
          <span class="tooltiptext">Advanced Heading</span>
        </div>


        </th>
        <th>

          <input
          type="text"
          name="from"
          id="from"
          value={this.state.from}
          placeholder={from}
          required />

        </th>
        </tr>
        </table>
        {
        //THIRD and FOURTH LINEs
        }
        <div class="col100">
          <input
          type="text"
          name="subject"
          id="subject"
          value={this.state.subject}
          placeholder={subject}
          required />
        </div>

        <div class="col100">
          <label>References (Optional)</label>
          <textarea
            type="text"
            name="references"
            id="references"
            value={this.state.references}
            placeholder="Enter references in format:&#10;(a) AFMAN 33-326, 25 November 2011, Preparing Official Communications.&#10;(b) SAF/CIO A6 Memo, 12 October 2011, Air Force Guidance Memorandum to AFI 33-360, Publications and Forms Management.&#10;(c) DoDM 5110.04-M-V2, October 26, 2010, DoD Manual for Written Material."
            style={{height: '120px', width: '100%'}}
            onChange={this.handleParagraphChange}
          />
        </div>

        <div class="col100">
          {/* All paragraphs handled by ParagraphInputs now */}
        </div>

        <ParagraphInputs 
          extraParagraphs={extraParagraphs} 
          paragraphArray={paragraphArray} 
          onParagraphChange={this.handleParagraphChange}
          onSubparagraphChange={this.handleSubparagraphChange}
          onSubSubparagraphChange={this.handleSubSubparagraphChange}
          onRemoveParagraph={this.removeParagraph}
          onRemoveSubparagraph={this.removeSubparagraph}
          onRemoveSubSubparagraph={this.removeSubSubparagraph}
          onAddParagraphAfter={this.addParagraphAfter}
          onAddSubparagraphTo={this.addSubparagraphTo}
          onAddSubSubparagraphTo={this.addSubSubparagraphTo}
        />


            {

                //SIGNATURE BLOCK
            }

    <label style={{display:'inline-block', width: '100%'}}>Signature Block</label>

        <div class="col50" >
            <input
                type="text"
                name="writersname"
                id="writersname"
                value={this.state.writersNameUpper}
                placeholder={writersname}
                onChange={this.handleChangeUpper}
                required/>
        </div>



        <div class="col50">
            <select
                type="text"
                name="branch"
                id="branch"
                defaultValue="USAF"
                required
                onChange={this.handleChange}>
                    <option value="" disabled >Choose Your Branch</option>
                    <option value="USAF">United States Air Force</option>
                    <option value="USA">United States Army</option>
                    <option value="USN">United States Navy</option>
                    <option value="USMC">United States Marine Corps</option>
            </select>
        </div>

        <div class="col50">
            <input
                type="text"
                name="dutytitle"
                id="dutytitle"
                value={this.state.dutytitle}
                placeholder={dutytitle}
                required />
        </div>

        <div class="col100">
          <label>Rank</label>
          <select
            name="rank"
            id="rank"
            value={this.state.rank}
            onChange={this.handleParagraphChange}
            required>
            <option value="" disabled>Choose Your Rank</option>
            <option value="C1C">C1C</option>
            <option value="C2C">C2C</option>
            <option value="C3C">C3C</option>
            <option value="C4C">C4C</option>
            <option value="SSgt">Staff Sergeant</option>
            <option value="TSgt">Technical Sergeant</option>
            <option value="MSgt">Master Sergeant</option>
            <option value="SMSgt">Senior Master Sergeant</option>
            <option value="CMSgt">Chief Master Sergeant</option>
            <option value="2d Lt">Second Lieutenant</option>
            <option value="1st Lt">First Lieutenant</option>
            <option value="Capt">Captain</option>
            <option value="Maj">Major</option>
            <option value="Lt. Col.">Lieutenant Colonel</option>
            <option value="Colonel">Colonel</option>
            <option value="Brigadier Genearl">Brigadier General</option>
            <option value="Major General">Major General</option>
            <option value="Lieutenant General">Lieutenant General</option>
            <option value="General">General</option>
          </select>
        </div>

        <div class="col100" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px'}}>
          <label style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'block'}}>Attachments</label>
          
          {this.state.attachments.map((attachment, index) => (
            <div key={index} style={{marginBottom: '15px', padding: '15px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #ddd'}}>
              <label style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block'}}>Attachment {index + 1}</label>
              
              <div class="col100">
                <input
                  type="text"
                  placeholder="Brief description of attachment"
                  value={attachment.description}
                  onChange={(e) => this.handleAttachmentChange(index, 'description', e.target.value)}
                  style={{marginBottom: '10px'}}
                  required
                />
              </div>

              <div class="col50">
                <input
                  type="text"
                  placeholder="Office of origin"
                  value={attachment.officeOfOrigin}
                  onChange={(e) => this.handleAttachmentChange(index, 'officeOfOrigin', e.target.value)}
                  required
                />
              </div>

              <div class="col50">
                <input
                  type="text"
                  placeholder="Type of communication"
                  value={attachment.typeOfCommunication}
                  onChange={(e) => this.handleAttachmentChange(index, 'typeOfCommunication', e.target.value)}
                  required
                />
              </div>

              <div class="col50">
                <input
                  type="date"
                  value={attachment.date}
                  onChange={(e) => this.handleAttachmentChange(index, 'date', e.target.value)}
                  required
                />
              </div>

              <div class="col50">
                <input
                  type="number"
                  placeholder="Number of copies"
                  min="1"
                  value={attachment.copies}
                  onChange={(e) => this.handleAttachmentChange(index, 'copies', parseInt(e.target.value) || 1)}
                />
              </div>

              <div class="col100">
                <label style={{marginBottom: '5px', display: 'block'}}>Upload PDF Attachment:</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => this.handleFileUpload(index, e.target.files[0])}
                  style={{marginBottom: '10px'}}
                />
              </div>

              <button 
                type="button" 
                onClick={() => this.removeAttachment(index)}
                style={{
                  backgroundColor: '#f44336', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove Attachment
              </button>
            </div>
          ))}

          <button 
            type="button" 
            onClick={this.addAttachment}
            style={{
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add Attachment
          </button>
        </div>

        <div class="col100" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
          <label style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'block'}}>Dual Signature Option</label>
          <div style={{marginBottom: '15px'}}>
            <input
              type="checkbox"
              name="dualSignature"
              id="dualSignature"
              checked={this.state.dualSignature}
              onChange={this.handleParagraphChange}
              style={{marginRight: '10px'}}
            />
            <label htmlFor="dualSignature">Enable second signature block (for dual signatures)</label>
          </div>

          {this.state.dualSignature && (
            <div style={{marginTop: '15px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '6px'}}>
              <label style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block'}}>Second Signer Information</label>
              
              <div class="col50">
                <input
                  type="text"
                  name="writersname2"
                  id="writersname2"
                  value={this.state.writersname2}
                  placeholder="Second Signer's Name FIRST MI. LAST"
                  onChange={this.handleParagraphChange}
                  required={this.state.dualSignature}
                />
              </div>

              <div class="col50">
                <select
                  type="text"
                  name="branch2"
                  id="branch2"
                  value={this.state.branch2}
                  onChange={this.handleParagraphChange}
                  required={this.state.dualSignature}
                >
                  <option value="" disabled>Choose Second Signer's Branch</option>
                  <option value="USAF">United States Air Force</option>
                  <option value="USA">United States Army</option>
                  <option value="USN">United States Navy</option>
                  <option value="USMC">United States Marine Corps</option>
                </select>
              </div>

        <div class="col50">
                <input
                  type="text"
                  name="dutytitle2"
                  id="dutytitle2"
                  value={this.state.dutytitle2}
                  placeholder="Second Signer's Position"
                  onChange={this.handleParagraphChange}
                  required={this.state.dualSignature}
                />
        </div>

        <div class="col50">
                <label>Second Signer's Rank</label>
                <select
                  name="rank2"
                  id="rank2"
                  value={this.state.rank2}
                  onChange={this.handleParagraphChange}
                  required={this.state.dualSignature}
                >
                  <option value="" disabled>Choose Second Signer's Rank</option>
                  <option value="C1C">C1C</option>
                  <option value="C2C">C2C</option>
                  <option value="C3C">C3C</option>
                  <option value="C4C">C4C</option>
                  <option value="SSgt">Staff Sergeant</option>
                  <option value="TSgt">Technical Sergeant</option>
                  <option value="MSgt">Master Sergeant</option>
                  <option value="SMSgt">Senior Master Sergeant</option>
                  <option value="CMSgt">Chief Master Sergeant</option>
                  <option value="2d Lt">Second Lieutenant</option>
                  <option value="1st Lt">First Lieutenant</option>
                  <option value="Capt">Captain</option>
                  <option value="Maj">Major</option>
                  <option value="Lt. Col.">Lieutenant Colonel</option>
                  <option value="Colonel">Colonel</option>
                  <option value="Brigadier Genearl">Brigadier General</option>
                  <option value="Major General">Major General</option>
                  <option value="Lieutenant General">Lieutenant General</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>
          )}
        </div>


        </form>
        
        <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <button 
            form="memorandumForm" 
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', 
              border: 'none', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              fontSize: '18px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
              minWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 30px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(76, 175, 80, 0.3)';
            }}
          >
            ✅ Submit Memorandum
        </button>

          <button 
            onClick={this.clearForm}
            style={{
              background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)', 
              border: 'none', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              fontSize: '18px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)',
              minWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 30px rgba(244, 67, 54, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(244, 67, 54, 0.3)';
            }}
          >
            🗑️ Clear Form
          </button>
        </div>
</div>

        );
    }
}

export default Form;
