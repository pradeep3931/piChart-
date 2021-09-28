// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverageView from '../VaccinationCoverage'
import VaccineByGender from '../VaccinationByGender'
import VaccnationByage from '../VaccinationByAge'

import {
  NavBarContainer,
  ImgElement,
  BgContainerElement,
  HeaderElement,
  LoaderDivContainer,
  UnorderedListContainer,
  ParagraphElement,
  FailureImageElement,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class CowinDashboard extends Component {
  state = {
    vaccinationCovergeList: [],
    vaccinationByGenderList: [],
    vaccinationByAgeList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const lastSevenVaccinations = fetchedData.last_7_days_vaccination.map(
        each => ({
          dose1: each.dose_1,
          dose2: each.dose_2,
          vaccinationDate: each.vaccine_date,
        }),
      )
      const vaccinationByGender = fetchedData.vaccination_by_gender
      const vaccinationByAge = fetchedData.vaccination_by_age
      this.setState({
        vaccinationCovergeList: lastSevenVaccinations,
        vaccinationByGenderList: vaccinationByGender,
        vaccinationByAgeList: vaccinationByAge,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.code === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationView = () => {
    const {
      vaccinationCovergeList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state

    return (
      <BgContainerElement>
        <UnorderedListContainer>
          <HeaderElement>Vaccination Coverage</HeaderElement>
          <VaccinationCoverageView vaccinationList={vaccinationCovergeList} />
        </UnorderedListContainer>
        <UnorderedListContainer>
          <HeaderElement>Vaccination by gender</HeaderElement>
          <VaccineByGender vaccinebyGenderList={vaccinationByGenderList} />
        </UnorderedListContainer>
        <UnorderedListContainer>
          <HeaderElement>Vaccination by age</HeaderElement>
          <VaccnationByage vaccineByAgeList={vaccinationByAgeList} />
        </UnorderedListContainer>
      </BgContainerElement>
    )
  }

  renderLoader = () => (
    <LoaderDivContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </LoaderDivContainer>
  )

  renderVaccinationFailureSectionView = () => (
    <BgContainerElement>
      <FailureImageElement
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <HeaderElement>Something went wrong</HeaderElement>
    </BgContainerElement>
  )

  renderVaccinationData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationView()
      case apiStatusConstants.failure:
        return this.renderVaccinationFailureSectionView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <BgContainerElement>
        <NavBarContainer>
          <ImgElement
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
            alt=" website logo"
          />
          <HeaderElement web>Co-WIN</HeaderElement>
        </NavBarContainer>
        <HeaderElement>CoWIN Vaccination In India </HeaderElement>
        {this.renderVaccinationData()}
      </BgContainerElement>
    )
  }
}
