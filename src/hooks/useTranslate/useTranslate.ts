import { useI18n, RosettaExtended } from 'next-rosetta';
import { LanguageTable } from '@/i18n/types';

/**
 * @example <caption>Simple</caption>
 * const { t } = useTranslate()
 * const text = t("title")
 */
const useTranslate: () => RosettaExtended<LanguageTable> = useI18n;

export default useTranslate;
