import React from "react"

const ParagraphInputs = (props) => {
  return (
    props.paragraphArray.map((val, index)=> {
      let paraID = `paragraph-${index + 1}`
      return (
        <div key={index} className="col100" style={{marginBottom: '1em'}}>
          <label htmlFor={paraID}>{`Paragraph #${index + 1}`}</label>
          <textarea
            style={{height:'10%'}}
            type="text"
            name={paraID}
            data-id={index}
            id={paraID}
            placeholder={`Insert Paragraph ${index + 1}`}
            value={props.paragraphArray[index].paraInfo}
            className="paraInfo"
            onChange={props.onParagraphChange}
          />
          <div style={{marginTop: '5px'}}>
            <button type="button" onClick={() => props.onAddParagraphAfter(index)} style={{marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Add Paragraph After</button>
            <button type="button" onClick={() => props.onAddSubparagraphTo(index)} style={{marginRight: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Add Subparagraph</button>
            <button type="button" onClick={() => props.onRemoveParagraph(index)} style={{color: 'white', backgroundColor: '#f44336', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Remove Paragraph</button>
          </div>
          {/* Render subparagraphs if any */}
          {val.subparagraphs && val.subparagraphs.length > 0 && (
            <div style={{marginLeft: '2em', marginTop: '0.5em'}}>
              {val.subparagraphs.map((sub, subIdx) => (
                <div key={subIdx} style={{marginBottom: '0.5em'}}>
                  <label htmlFor={`subparagraph-${index + 1}-${subIdx + 1}`}>{`Subparagraph (${index + 1}${String.fromCharCode(97 + subIdx)})`}</label>
                  <textarea
                    style={{height:'8%'}}
                    type="text"
                    name={`subparagraph-${index + 1}-${subIdx + 1}`}
                    data-paragraphid={index}
                    data-subid={subIdx}
                    id={`subparagraph-${index + 1}-${subIdx + 1}`}
                    placeholder={`Insert Subparagraph ${index + 1}${String.fromCharCode(97 + subIdx)}`}
                    value={sub}
                    className="subparagraphInfo"
                    onChange={props.onSubparagraphChange}
                  />
                  <div style={{marginTop: '5px'}}>
                    <button type="button" onClick={() => props.onAddParagraphAfter(index)} style={{marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Add Paragraph After</button>
                    <button type="button" onClick={() => props.onAddSubparagraphTo(index)} style={{marginRight: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Add Subparagraph</button>
                    <button type="button" onClick={() => props.onRemoveSubparagraph(index, subIdx)} style={{color: 'white', backgroundColor: '#f44336', border: 'none', padding: '5px 10px', borderRadius: '3px'}}>Remove Subparagraph</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    })
  )
}
export default ParagraphInputs
