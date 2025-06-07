<script lang="ts">
  // TODO: there has to be a better way to load static assets
  import logoSrc from '../../../resources/wpilib-generic.svg';

  let vscode: any;
  
  try {
    vscode = (window as any).vscode;
  } catch (e) {
    console.error('Failed to acquire VSCode API:', e);
  }
  
  function openCommandPalette() {
    if (vscode) {
      vscode.postMessage({ command: 'openCommandPalette' });
    }
  }
  
  function openDocumentation() {
    if (vscode) {
      vscode.postMessage({ command: 'openDocumentation' });
    }
  }
</script>

<div class="project-container">
  <img src={logoSrc} height="75" alt="WPILib Logo" />

  <h1 class="project-title">WPILib Help</h1>

  <div class="project-row">
    <p>Welcome to WPILib Help! To open this window again, open the Command Palette (F1 or View->Command Palette), and
      select
      <b>Open WPILib Help.</b>
    </p>
    <p>For more help, see
      <a href="https://docs.wpilib.org/en/stable">the WPILib documentation.</a>
    </p>
  </div>

  <div class="project-row">
    <h2 class="project-subtitle">Common Tasks</h2>
    <br>
    <p></p>
    <ul>
      <li>Create a new project: Click on the Command Palette and type "WPILib: Create a new project"</li>
      <li>Deploy code to the robot: Click on the Command Palette and type "WPILib: Deploy Robot Code"</li>
      <li>Start a simulation: Click on the Command Palette and type "WPILib: Simulate Robot Code"</li>
      <li>Install vendor libraries: Click on "WPILib Dependencies" in the Activity Bar</li>
    </ul>
  </div>

  <div class="project-row">
    <h2 class="project-subtitle">Setting Up Your Workspace</h2>
    <ul>
      <li>Set your team number: Click on the Command Palette and type "WPILib: Set Team Number"</li>
      <li>Enable desktop support: Click on the Command Palette and type "WPILib: Set Desktop Support"</li>
      <li>Run RioLog: Click on the Command Palette and type "WPILib: Start RioLog"</li>
      <li>Import a project: Click on the Command Palette and type "WPILib: Import a WPILib 2020-2024 Gradle project"</li>
    </ul>
  </div>

  <div class="project-actions">
    <button onclick={openCommandPalette} class="project-button">Open Command Palette</button>
    <button onclick={openDocumentation} class="project-button">Open WPILib Documentation</button>
  </div>
</div>

<style>
  .project-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .project-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .project-subtitle {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .project-row {
    margin-bottom: 20px;
  }

  .project-actions {
    margin-top: 30px;
    display: flex;
    gap: 10px;
  }

  .project-button {
    padding: 8px 16px;
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }

  .project-button:hover {
    background-color: var(--vscode-button-hoverBackground);
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: var(--vscode-textLink-foreground);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>