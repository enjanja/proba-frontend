import { colors } from '../../../global.styles'
import { DoctorType } from '../../../interfaces/dataTypes'
import { Button } from '../../button/button.styles'
import { ButtonDivider, ButtonDividerInner, Form } from '../../form/form.styles'
import { H3 } from '../../text/text.styles'

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
    <Form>
      <H3
        style={{
          textAlign: 'center',
        }}
      >
        Are you sure you want to deactivate <br />
        Dr {doctor?.name}
      </H3>
      <ButtonDivider>
        <ButtonDividerInner>
          <Button
            form="update-form"
            type="button"
            backgroundColor={colors.black}
            onClick={onClose}
          >
            No
          </Button>
        </ButtonDividerInner>
        <ButtonDividerInner>
          <Button backgroundColor={colors.red} onClick={onDeactivate}>
            Yes
          </Button>
        </ButtonDividerInner>
      </ButtonDivider>
    </Form>
  )
}

export default DeactivateDoctor
