import { colors } from '../../global.styles'
import { Button } from '../button/button.styles'
import { ButtonDivider, ButtonDividerInner } from '../form/form.styles'

const Deactivate = ({
  onCancel,
  onDeactivate,
}: {
  onCancel: () => void
  onDeactivate: () => void
}) => {
  const handleCancel = () => {
    onCancel()
  }
  const handleDeactivate = () => {
    onDeactivate()
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>This action will deactivate this users profile</h3>
      </div>
      <ButtonDivider>
        <ButtonDividerInner>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonDividerInner>
        <ButtonDividerInner>
          <Button color={colors.black} onClick={handleDeactivate}>
            Confirm
          </Button>
        </ButtonDividerInner>
      </ButtonDivider>
    </>
  )
}

export default Deactivate
