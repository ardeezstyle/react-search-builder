import * as React from 'react';
import SearchResultCSS from './SearchResult.module.css';
import * as Images from '../assets/images';

const publicationDates = ["1 year", "5 years", "10 years"];
const species = ["Humans", "Other Animals"];
const gender = ["Male", "Female"];
const articleTypes = ["Books and Documents", "Clinical Trial", "Meta-Analysis", "Randomized Controlled Trial", "Review","Systematic Reviews"];
const age = [ "Child: birth-18 years", "Newborn: birth-1 month",  "Infant: birth-23 months",
"Infant: 1-23 months", "Preschool Child: 2-5 years", "Child: 6-12 years", "Adolescent: 13-18 years"];

class SearchResult extends React.Component<any, any>  {

  public render() {
    return (
        <div>
            <div className={SearchResultCSS.Top}>
                <div className={SearchResultCSS.Counter}>
                    <div><strong>70</strong></div>
                    <div>Total Score</div>
                </div>
                <div>
                    <div className={SearchResultCSS.FilterHeading}>No of Database: <strong>3</strong></div>
                    <div className={SearchResultCSS.Filters}>
                        <div className={SearchResultCSS.ActiveFilter}>PubMed: <strong>53</strong></div>
                        <div>Google Scholar: <strong>232</strong></div>
                        <div>Embase: <strong>32</strong></div>
                    </div>
                </div>
                <div>
                    <div className={SearchResultCSS.FilterHeading}>No of Articles: <strong>323</strong></div>
                    <div className={SearchResultCSS.Filters}>
                        <div className={SearchResultCSS.ActiveFilter}>Paid Articles: <strong>32</strong></div>
                        <div>Free Articles: <strong>296</strong></div>
                        <div className={SearchResultCSS.ActiveFilter}>Pending Evaluation: <strong>296</strong></div>
                    </div>
                </div>
                <div>
                    <div className={SearchResultCSS.FilterHeading}>Evaluation: <strong>323</strong></div>
                    <div className={SearchResultCSS.Filters}>
                        <div>Qualified: <strong>22</strong></div>
                        <div>Not Qualified: <strong>3</strong></div>
                    </div>
                </div>
                <div className={SearchResultCSS.LastCell}>
                    <div>Clear Filters</div>
                    <div className={SearchResultCSS.Pagination}>
                        <div className={SearchResultCSS.CellHighlighted}>1-4</div>
                        <div className={SearchResultCSS.Cell}> of 4</div>
                        <div className={SearchResultCSS.Navigate}>
                            <div><img src={Images.prev} alt="" title="" /></div>
                            <div><img src={Images.next} alt="" title="" /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={SearchResultCSS.Body}>
                <div className={SearchResultCSS.FilterPanel}>
                    <div><strong>Filters</strong></div>
                    <div className={SearchResultCSS.FilterGroups}>
                        <div className={SearchResultCSS.Heading}>Result by year</div>
                        <img style={{marginBottom: '50px', width: '100%', objectFit: 'contain'}} src={Images.ResultByYear} alt="ResultByYear" title="ResultByYear" />

                        <div className={SearchResultCSS.Heading}>Publication date</div>
                        <ul className={SearchResultCSS.List}>
                            {publicationDates.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="radio" name="pubdate" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SearchResultCSS.Heading}>Species</div>
                        <ul className={SearchResultCSS.List}>
                            {species.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SearchResultCSS.Heading}>Gender</div>
                        <ul className={SearchResultCSS.List}>
                            {gender.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SearchResultCSS.Heading}>Article Type</div>
                        <ul className={SearchResultCSS.List}>
                            {articleTypes.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                        <div className={SearchResultCSS.Heading}>Age</div>
                        <ul className={SearchResultCSS.List}>
                            {age.map((db: any, idx: number) =>
                                <li key={idx}><label><input type="checkbox" value={db} /><span>{db}</span></label></li>)}
                        </ul>
                    </div>

                </div>
                <div className={SearchResultCSS.Articles}>
                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.ActiveArticle}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.BlueTag}>Qualified</div>
                            <div>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.OrangeTag}>Disqualified</div>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>

                    <div className={SearchResultCSS.Article}>
                        <div className={SearchResultCSS.Sticker}>$20</div>
                        <h2>Fever in Children and Fever of Unknown Origin</h2>
                        <div className={SearchResultCSS.Copy}>Fever is the most common symptom in children and can be classified as fever with or without focus. Fever without focus can be less
                        than 7 d and is subclassified as fever without localizing signs and fever of unknown origin (FUO). FUO is defined as a temperature
                        greater than 38.3 °C, for more than 3 wk or failure to reach a diagnosis after 1 wk of inpatient investigations.
                        The most com... <a href="/">Read more</a></div>
                        <div className={SearchResultCSS.Bottom}>
                            <div className={SearchResultCSS.Tag}>PubMed</div>
                            <span className={SearchResultCSS.Spacer}></span>
                            <div className={SearchResultCSS.Tag}>Rating: <strong>70%</strong></div>
                        </div>
                    </div>
                </div>
                <div className={SearchResultCSS.ArticleDetails}>
                    <div className={SearchResultCSS.ArticleDetailsTop}>
                        <div className={SearchResultCSS.Overview}>
                            <strong>OVERVIEW</strong>
                            <div>$20</div>
                            <div className={SearchResultCSS.Tag}>Rating: 70%</div>
                        </div>
                        <div className={SearchResultCSS.TakeAction}>
                            <div className={SearchResultCSS.Tag}>Take Action</div>
                            <div><img src={Images.EditNotify} alt="EditNotify" title="EditNotify" /></div>
                        </div>
                    </div>
                    <div className={SearchResultCSS.ArticleDetailsBody}>
                        <div><strong>Fever in Children and Fever of Unknown Origin</strong></div>
                        <div>Rajeshwar Dayal 1 2, Dipti Agarwal 3<br/>
                            Affiliations expand<br />
                            PMID: 25724501 DOI: 10.1007/s12098-015-1724-4</div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>Abstract</strong></div>
                            <div>
                            Tryptophan is an essential amino acid catabolized initially to kynurenine (kyn), an immunomodulatory metabolite that we
                            have previously shown to promote bone loss. Kyn levels increase with aging and have also been associated with
                            <strong>Flu Vaccines</strong> neurodegenerative disorders. Picolinic acid (PA) is another tryptophan metabolite
                            downstream of kyn. However, in contrast to kyn, <strong>Johnson and johnson</strong>  , Viral VaccinesPA is reported
                            to be neuroprotective and further, to promote osteogenesis in vitro. Thus, we hypothesized that PA might be
                            osteoprotective in vivo. In an IACUC-approved protocol, we fed PA to aged (23-month-old) C57BL/6 mice for eight weeks.
                            In an effort to Clicnical study potential interactions of PA with dietary protein <strong>Influenza Vaccines</strong>
                            we also fed PA in a low-protein diet (8%). The mice were divided into four groups: Control (18% dietary protein),
                            +PA (700 ppm); Low-protein (8%), +PA (700 ppm). The PA feedings had no impact on mouse weight, body composition or
                            bone density. At sacrifice bone and stem cells were collected for analysis, including μCT and RT-qPCR.
                            Addition <strong>GTemp</strong> of PA to the diet had no impact on trabecular bone parameters. However, marrow adiposity
                            was significantly increased in PA-fed mice, and in bone marrow stromal cells isolated from these mice increases in the
                            expression of the lipid storage genes, Plin1 and Cidec, were observed. Thus, as a downstream metabolite of kyn,
                            PA no longer showed kyn's detrimental effects on bone but instead appears to impact energy balance.</div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}><strong>Keywords</strong>: Connective tissue disorder; Diagnosis; Fever; Infections; Malignancy.</div>

                        <div className={SearchResultCSS.Paragraph}>Cited by 5 PubMed Central articles</div>

                        <div className={SearchResultCSS.Paragraph}>
                            <strong>Pediatric Spinal Epidural Abscess: A Case Report of a 12-year-old Girl Without Risk Factors</strong>
                            <div>R Sugawara et al. J Am Acad Orthop Surg Glob Res Rev 3 (3), e066. 2019. PMID 31157318. - Case Reports
                            A 12-year-old girl presented with a spinal epidural abscess (SEA), an unusual emergent infectious disease that often requires surgical intervention. Its nonspecific sympt
                            </div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>Etiology and Clinical Characteristics of Fever of Unknown Origin in Children: A 15-year Experience in a Single Center</strong></div>
                            <div>YS Kim et al. Korean J Pediatr 60 (3), 77-85. Mar 2017. PMID 28392823.
                            Almost half of our patients were left without diagnosis. Although it has been known that infectious disease was most common cause of pediatric FUO in the past, undiagnose …</div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>Whole-body MRI: Non-Oncological Applications in Paediatrics</strong></div>
                            <div>MB Damasio et al. Radiol Med 121 (5), 454-61. May 2016. PMID 26892067. - Review</div>
                            <div>Whole-body magnetic resonance imaging (WBMRI) is a fast and accurate method for detecting and monitoring of diseases throughout the entire body without exposure to ionizi …</div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>Rectal Diclofenac Versus Rectal Paracetamol: Comparison of Antipyretic Effectiveness in Children</strong></div>
                            <div>MR Sharif et al. Iran Red Crescent Med J 18 (1), e27932. 2016. PMID 26889398.</div>
                            <div>In the first one hour, Diclofenac suppository is able to control the fever more efficient than Paracetamol suppositories.</div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>Culture Negative Stent Infection in an Infant With Hypoplastic Left Heart and Persistent Fever</strong></div>
                            <div>KD Piggott et al. Case Rep Cardiol 2015, 496108. 2015. PMID 26435853.</div>
                            <div>We present an infant with hypoplastic left heart with persistent fever despite two courses of antibiotics and repeatedly negative blood cultures. He eventually underwent …</div>
                        </div>

                        <div className={SearchResultCSS.Paragraph}>
                            <div><strong>References</strong></div>
                            <div>Medicine (Baltimore). 1961 Feb;40:1-30 - PubMed</div>
                            <div>Natl Med J India. 1996 Jan-Feb;9(1):28-31 - PubMed</div>
                            <div>Arch Pediatr. 2004 Nov;11(11):1319-25 - PubMed</div>
                            <div>Infect Dis Clin North Am. 2007 Dec;21(4):1137-87, xi - PubMed</div>
                            <div>Am Fam Physician. 2003 Dec 1;68(11):2223-8 - PubMed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default SearchResult;
