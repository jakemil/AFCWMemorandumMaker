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
          <button type="button" onClick={() => props.onRemoveParagraph(index)} style={{marginLeft: '10px', color: 'red'}}>Remove Paragraph</button>
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
                  <button type="button" onClick={() => props.onRemoveSubparagraph(index, subIdx)} style={{marginLeft: '10px', color: 'red'}}>Remove Subparagraph</button>
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
