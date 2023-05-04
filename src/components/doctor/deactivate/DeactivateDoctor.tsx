import { colors } from '../../../global.styles'
import { DoctorType } from '../../../interfaces/dataTypes'
import { Button } from '../../button/button.styles'
import {
  AddDoctorFormContainer,
  ButtonDivider,
  ButtonDividerInner,
} from '../../form/form.styles'

interface DeactivateDoctorProps {
  onClose: () => void
  onDeactivate: () => void
  doctor: DoctorType | null
}

const DeactivateDoctor = ({
  onClose,
  onDeactivate,
  doctor,
}: DeactivateDoctorProps) => {
  return (
    <AddDoctorFormContainer>
      <h3
        style={{
          color: colors.black,
          textAlign: 'center',
          marginBottom: '35px',
        }}
      >
        Are you sure you want to deactivate <br />
        Dr {doctor?.name}
      </h3>
      <ButtonDivider>
        <ButtonDividerInner>
          <Button
            form="update-form"
            type="button"
            color={colors.blue}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ButtonDividerInner>{' '}
        <ButtonDividerInner>
          <Button color={colors.black} onClick={onDeactivate}>
            Yes
          </Button>
        </ButtonDividerInner>
      </ButtonDivider>
    </AddDoctorFormContainer>
  )
}

export default DeactivateDoctor
