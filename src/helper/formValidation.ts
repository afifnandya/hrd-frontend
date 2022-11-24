import { helpers, required as requiredRule } from '@vuelidate/validators'

export const requiredMessage = helpers.withMessage(
  ({ $pending, $invalid, $params, $model }) => `This field cannot be empty`,
  requiredRule
)
