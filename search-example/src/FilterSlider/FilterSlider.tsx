import * as React from 'react';
import SliderCSS from './FilterSlider.module.css';

import * as Images from '../assets/images';

const database = ["PubMed", "Embase", "Google Scholar"];
const timeduration = ["1 Year", "3 Years", "5 Years", "Custom"];
const otherterms = ["In vivo", "In vitro"];
const articleTypes = ["Address", "Autobiography", "Bibliography", "Biography", "Case Reports", "Classical Article", "Clinical Conference",
    "Clinical Study", "Clinical Trial Protocol", "Clinical Trial, Phase I", "Clinical Trial, Phase II", "Clinical Trial, Phase III",
    "Clinical Trial, Phase IV", "Clinical Trial, Veterinary", "Comment", "Comparative Study", "Congress",
    "Dataset", "Dictionary", "Directory", "Duplicate Publication", "Editorial", "Electronic Supplementary Materials",
    "English Abstract", "Evaluation Study", "Festschrift", "Government Document", "Guideline", "Historical Article", "Interactive Tutorial",
    "Interview", "Introductory Journal Article", "Journal Article", "Lecture"];

class FilterSlider extends React.Component<any, any>  {
    onClose = () => {
        this.props.closed();
    }
    public render() {
        return (
            <div className={this.props.status === 'open' ? SliderCSS.SliderOpen : SliderCSS.Slider}>
                <div className={SliderCSS.Header}>
                    <span>Filters</span>
                    <img onClick={this.onClose} src={Images.CloseSlider} alt="close" />
                </div>
                <div className={SliderCSS.Body}>
                    <div>
                        <div className={SliderCSS.Heading}>Database</div>
                        <ul className={SliderCSS.List}>
                            {database.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SliderCSS.Heading}>Time Duration</div>
                        <ul className={SliderCSS.List}>
                            {timeduration.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="radio" value={db} name="duration" /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SliderCSS.Heading}>Other Terms</div>
                        <ul className={SliderCSS.List}>
                            {otherterms.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SliderCSS.Heading}>Article Type</div>
                        <ul className={SliderCSS.List + " " + SliderCSS.TwoColumns}>
                            {articleTypes.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}
export default FilterSlider;
