import { FC } from "react";

import { getIsDisabledLink } from "services/utils";

import { CustomLink } from "../../CustomLink/CustomLink";

import { LinksBoxStyles as Styled } from "./LinksBox.style";

import { ADMIN_LINKS, getAdminLinks } from "constants/header-links";

interface ILinksBox {
	active_user: boolean | null;
	role: string;
}
export const LinksBox: FC<ILinksBox> = (props) => {
	const { active_user, role } = props;
	const adminLinks = getAdminLinks(role);
	return (
		<Styled.Links>
			<Styled.LinkWrapper>
				{adminLinks.map((link) => (
					//isLast={link.isLast}
					<CustomLink key={link.title} to={link.route}  icontype={link.iconName}  is_sales={link.title === "SALES"} isDisabled={getIsDisabledLink(link.route, active_user)}>
						{link.title}
					</CustomLink>
				))}
			</Styled.LinkWrapper>
		</Styled.Links>
	);
};
