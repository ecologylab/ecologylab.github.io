package phoneemulator;
/**
 * 
 *
 * Interface for phone. 
 * All phones must implement this interface
 * 
 * @author Daniel J. Caruso
 */
public interface Phone {
	
	/**
	 * Method setTargetReciever.
	 * Set the phone we are calling
	 * @param p
	 */
	public abstract void setTargetReciever(Phone p);
	
	/**
	 * Method getTargetReciever.
	 * Returns the phone we are calling
	 * @return Phone
	 *
	 */
	public abstract Phone getTargetReciever();

	/**
	 * Method handelCallEvent.
	 * Invoked when a incoming CallEvent is sent to the phone
	 * @param e
	 * @throws CallException
	 * 
	 * 
	 */
	public abstract void handelCallEvent(CallEvent e) throws CallException;
	
	/**
	 * Method sendCallEvent.
	 * Invoked when you want to send an outgoing call
	 * @param e
	 * @throws CallException
	 */
	public abstract void sendCallEvent(CallEvent e) throws CallException;
	
	/**
	 * Method getMyNumber.
	 * 
	 * Returns the number of this phone
	 * @return String
	 */
	public abstract String getMyNumber();

}
