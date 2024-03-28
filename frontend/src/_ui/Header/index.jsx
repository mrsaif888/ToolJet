import React from 'react';
import cx from 'classnames';
import { Breadcrumbs } from '../Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { ButtonSolid } from '@/_ui/AppButton/AppButton';
import { ToolTip } from '@/_components';

function Header({ enableCollapsibleSidebar = false, collapseSidebar = false, toggleCollapsibleSidebar = () => { } }) {
  const currentVersion = localStorage.getItem('currentVersion');
  const darkMode = localStorage.getItem('darkMode') === 'true';

  const routes = (path) => {
    switch (path) {
      case 'workspaceId':
        return 'Applications';
      case 'database':
        return 'Database';
      case 'workspace-settings':
        return 'Workspace settings';
      case 'data-sources':
        return 'Data sources';
      case 'settings':
        return 'Profile settings';
      case 'integrations':
        return 'Integrations';
      case 'workspace-constants':
        return 'Workspace constants';
      default:
        return 'Applications';
    }
  };

  //   To address the inconsistency in the header styling of the Workspace Constants page within the ToolJet dashboard, the first step is to thoroughly examine the CSS styles applied to the header element. By comparing these styles with those used for headers on other pages, such as Applications, Data sources, and ToolJet Database, it's possible to pinpoint the specific differences causing the inconsistency. Once identified, adjustments can be made to the CSS styles of the Workspace Constants header to align it more closely with the styling of other headers.

  // After making the necessary modifications, rigorous testing of the Workspace Constants page is essential to ensure that the header now maintains consistency with other pages in the dashboard. This testing phase involves verifying that the updated styling does not introduce any unintended layout issues or visual discrepancies. Feedback from other contributors or maintainers of the ToolJet repository should also be sought to validate the proposed changes and gather additional insights for improvement.

  // Once the styling consistency issue has been successfully addressed, a pull request can be prepared with the proposed changes. The pull request should include a clear description of the problem, the steps taken to resolve it, and any relevant documentation updates. By following this process and collaborating effectively with the community, the inconsistency in the header styling of the Workspace Constants page can be rectified, ensuring a more cohesive and user-friendly experience for ToolJet dashboard users.
  const location = useLocation();
  const pathname = routes(location?.pathname.split('/').pop());

  return (
    <header className="layout-header">
      <div className="row w-100 gx-0">
        {!collapseSidebar && (
          <div className="tj-dashboard-section-header" data-name={pathname}>
            <div className="row">
              <div className="col-9">
                <p className="tj-text-md font-weight-500" data-cy="dashboard-section-header">
                  {pathname}
                </p>
              </div>
              {enableCollapsibleSidebar && !collapseSidebar && (
                <ToolTip message="Collapse sidebar" placement="bottom" delay={{ show: 0, hide: 100 }}>
                  <div className="col-3 px-3">
                    <ButtonSolid
                      variant="primary"
                      className="tj-text-xsm"
                      style={{
                        minWidth: '28px',
                        width: '28px',
                        height: '23px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: 'var(--indigo3)',
                        borderColor: `${darkMode ? '#ecedee' : '#AEC0F5'} `,
                      }}
                      leftIcon="cheveronleftdouble"
                      fill={darkMode ? '#ecedee' : '#3E63DD'}
                      iconWidth="14"
                      size="md"
                      onClick={toggleCollapsibleSidebar}
                    ></ButtonSolid>
                  </div>
                </ToolTip>
              )}
            </div>
          </div>
        )}
        <div className="col tj-dashboard-header-wrap">
          <div className="d-flex justify-content-sm-between">
            {enableCollapsibleSidebar && collapseSidebar && (
              <ToolTip message="Open sidebar" placement="bottom" delay={{ show: 0, hide: 100 }}>
                <div className="pe-3">
                  <ButtonSolid
                    variant="primary"
                    className="tj-text-xsm"
                    style={{
                      minWidth: '28px',
                      width: '28px',
                      height: '23px',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: 'var(--indigo3)',
                      borderColor: `${darkMode ? '#ecedee' : '#AEC0F5'} `,
                    }}
                    leftIcon="cheveronrightdouble"
                    fill={darkMode ? '#ecedee' : '#3E63DD'}
                    iconWidth="14"
                    size="md"
                    onClick={toggleCollapsibleSidebar}
                  ></ButtonSolid>
                </div>
              </ToolTip>
            )}
            <div className="app-header-label" data-cy="app-header-label">
              <Breadcrumbs darkMode={darkMode} />
            </div>
            <div
              className={cx('ms-auto tj-version tj-text-xsm', {
                'color-muted-darkmode': darkMode,
                'color-disabled': !darkMode,
              })}
              data-cy="version-label"
            >
              Version {currentVersion}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
