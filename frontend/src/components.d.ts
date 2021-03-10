import { Ref } from "@vue/reactivity";
import { ValidationRule } from "ant-design-vue/lib/form/Form";

declare interface Rules {
  [k: string]: ValidationRule | ValidationRule[];
}

declare interface LoginFormComponent {
  formRef: Ref;
  layout: Record<
    string,
    {
      [k: string]: number;
    }
  >;
  formData: UnwrapRef<LoginForm>;
  rules: Rules;
  onSubmit: () => Promise<null>;
}
