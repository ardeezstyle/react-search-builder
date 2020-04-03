import * as React from 'react';
import SliderCSS from './Slider.module.css';
import * as Images from '../assets/images';

const categories = ["analysis", "anatomy and histology", "blood", "cerebrospinal fluid", "chemically induced", "chemistry",
"classification", "complications", "congenital", "diagnosis", "diagnostic imaging", "diet therapy", "drug therapy",
"economics", "embryology", "enzymology", "epidemiology", "ethnology", "etiology", "genetics", "history", "immunology",
"metabolism", "microbiology", "mortality", "nursing", "organization and administration", "parasitology",
"pathology","physiology","physiopathology","prevention and control","psychology","radiotherapy","rehabilitation",
"statistics and No data","surgery","therapy","urine","veterinary","virology"
];


class Slider extends React.Component  {
  onClose = () => {
    this.props.closed();
  }

  render() {
    return (
        <div className={this.props.status === 'open' ? SliderCSS.SliderOpen : SliderCSS.Slider}>
            <div className={SliderCSS.Header}>
                <span>More info</span>
                <img onClick={this.onClose} src={Images.CloseSlider} alt="close" />
            </div>
            <div style={{padding: '20px 16px 12px', fontWeight: 'bold'}}>Flu vaccines</div>
            <div className={SliderCSS.Tabs}>
                <div className={SliderCSS.ActiveTab}>PubMed</div>
                <div className={SliderCSS.Tab}>Embase</div>
            </div>
            <div className={SliderCSS.Body}>
                <div><strong>Influenza Vaccines</strong></div>
                <div className={SliderCSS.Description}>Vaccines used to prevent infection by viruses in the family ORTHOMYXOVIRIDAE. It includes both killed and attenuated vaccines.
                The composition of the vaccines is changed each year in response to antigenic shifts and changes in prevalence of influenza virus strains.
                The flu vaccines may be mono- or multi-valent, which contains one or more INFLUENZAVIRUS A and INFLUENZAVIRUS B strains.</div>
                <div>
                    <div className={SliderCSS.Heading}>Categories</div>
                    <ul className={SliderCSS.List + " " + SliderCSS.ThreeColumns}>
                        {categories.map((db, idx) =>
                            <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
  }
}
export default Slider;
