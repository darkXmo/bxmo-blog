import { Ref } from "@vue/reactivity";

declare interface LoginFormComponent {
  formRef: Ref;
  layout: Record<string, Record<string, number>>;
  formData: UnwrapRef<LoginForm>;
  rules: Record<string, any>;
  onSubmit: () => Promise<null>;
}
