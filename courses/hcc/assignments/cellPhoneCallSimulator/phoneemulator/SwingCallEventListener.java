package phoneemulator;
/**
 *
 * Listener interface for call events on SwingPhones
 * 
 * @author Daniel J. Caruso
 */
public interface SwingCallEventListener
{
	/**
	 * Method callIncomming.
	 * 
	 * Invoked when someone is calling the SwingPhone
	 * we are registered to listen to.
	 * @param e
	 */
	public abstract void callIncomming(CallEvent e);
	
	/**
	 * Method callEnded.
	 * 
	 * Invoked when someone sends the SwingPhone
	 * we are registered to listen to a END call event
	 * @param e
	 */
	public abstract void callEnded(CallEvent e);
		
	/**
	 * Method callConnected.
	 * Invoked when someone sends a ACCEPT call event
	 * to the SeingPhone we are registered to listen to.
	 * @param e
	 */
	public abstract void callConnected(CallEvent e);

}
